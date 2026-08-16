const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SERVER_ENTRY = path.join(PROJECT_ROOT, 'server.js');
const APP_PORT = Number(process.env.PORT || 3000);
const CONTROL_PORT = Number(process.env.CONTROL_PORT || 3901);
const HEALTH_INTERVAL_MS = Number(process.env.HEALTH_INTERVAL_MS || 15000);
const HEALTH_TIMEOUT_MS = Number(process.env.HEALTH_TIMEOUT_MS || 3000);
const HEALTH_FAILURE_THRESHOLD = Number(process.env.HEALTH_FAILURE_THRESHOLD || 3);
const RESTART_DELAY_MS = Number(process.env.RESTART_DELAY_MS || 1500);
const RESTART_TOKEN = process.env.RESTART_TOKEN || '';

let child = null;
let childStartedAt = null;
let restartCount = 0;
let consecutiveHealthFailures = 0;
let lastExit = null;
let lastRestartReason = null;
let plannedRestart = false;
let shuttingDown = false;
let restartTimer = null;

function log(message) {
  console.log(`[server-manager] ${new Date().toISOString()} ${message}`);
}

function childStatus() {
  return {
    managerPid: process.pid,
    childPid: child?.pid || null,
    running: Boolean(child && child.exitCode === null && !child.killed),
    appPort: APP_PORT,
    controlPort: CONTROL_PORT,
    childStartedAt,
    restartCount,
    consecutiveHealthFailures,
    lastRestartReason,
    lastExit,
  };
}

function scheduleStart(reason, delay = RESTART_DELAY_MS) {
  if (shuttingDown || restartTimer) return;
  lastRestartReason = reason;
  restartTimer = setTimeout(() => {
    restartTimer = null;
    startChild(reason);
  }, delay);
}

function startChild(reason = 'initial-start') {
  if (shuttingDown) return;
  if (child && child.exitCode === null && !child.killed) return;

  lastRestartReason = reason;
  consecutiveHealthFailures = 0;
  childStartedAt = new Date().toISOString();

  child = spawn(process.execPath, [SERVER_ENTRY], {
    cwd: PROJECT_ROOT,
    env: { ...process.env, PORT: String(APP_PORT) },
    stdio: 'inherit',
    windowsHide: true,
  });

  log(`application started pid=${child.pid} reason=${reason}`);

  child.once('exit', (code, signal) => {
    lastExit = {
      at: new Date().toISOString(),
      code,
      signal,
    };

    const wasPlanned = plannedRestart;
    plannedRestart = false;
    child = null;

    if (shuttingDown) {
      log(`application stopped during manager shutdown code=${code} signal=${signal || '-'}`);
      return;
    }

    restartCount += 1;
    const reasonText = wasPlanned ? 'manual-or-health-restart' : 'unexpected-exit';
    log(`application exited code=${code} signal=${signal || '-'}; scheduling restart`);
    scheduleStart(reasonText);
  });

  child.once('error', (error) => {
    log(`failed to start application: ${error.message}`);
  });
}

function terminateChild() {
  if (!child || child.exitCode !== null || child.killed) return false;

  try {
    child.kill('SIGTERM');
  } catch (error) {
    log(`SIGTERM failed: ${error.message}`);
    try {
      child.kill('SIGKILL');
    } catch (killError) {
      log(`SIGKILL failed: ${killError.message}`);
    }
  }
  return true;
}

function restartChild(reason = 'manual-restart') {
  if (shuttingDown) return;
  lastRestartReason = reason;

  if (!child || child.exitCode !== null || child.killed) {
    scheduleStart(reason, 0);
    return;
  }

  plannedRestart = true;
  log(`restart requested reason=${reason}`);
  terminateChild();
}

function healthCheck() {
  if (shuttingDown || !child) return;

  const request = http.get(
    {
      hostname: '127.0.0.1',
      port: APP_PORT,
      path: '/api/health',
      timeout: HEALTH_TIMEOUT_MS,
    },
    (response) => {
      response.resume();
      if (response.statusCode >= 200 && response.statusCode < 300) {
        consecutiveHealthFailures = 0;
        return;
      }
      registerHealthFailure(`HTTP ${response.statusCode}`);
    }
  );

  request.on('timeout', () => {
    request.destroy(new Error('health check timeout'));
  });

  request.on('error', (error) => {
    registerHealthFailure(error.message);
  });
}

function registerHealthFailure(reason) {
  consecutiveHealthFailures += 1;
  log(`health check failed (${consecutiveHealthFailures}/${HEALTH_FAILURE_THRESHOLD}): ${reason}`);

  if (consecutiveHealthFailures >= HEALTH_FAILURE_THRESHOLD) {
    consecutiveHealthFailures = 0;
    restartChild('health-check-failed');
  }
}

function authorized(req) {
  if (!RESTART_TOKEN) return true;
  return req.headers['x-restart-token'] === RESTART_TOKEN;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
}

const controlServer = http.createServer((req, res) => {
  if (!authorized(req)) {
    return sendJson(res, 401, { ok: false, message: 'unauthorized' });
  }

  if (req.method === 'GET' && req.url === '/status') {
    return sendJson(res, 200, { ok: true, ...childStatus() });
  }

  if (req.method === 'POST' && req.url === '/restart') {
    restartChild('control-api');
    return sendJson(res, 202, { ok: true, message: 'restart accepted', ...childStatus() });
  }

  if (req.method === 'POST' && req.url === '/start') {
    startChild('control-api-start');
    return sendJson(res, 202, { ok: true, message: 'start accepted', ...childStatus() });
  }

  if (req.method === 'POST' && req.url === '/stop') {
    sendJson(res, 202, { ok: true, message: 'manager shutdown accepted' });
    setTimeout(() => shutdown('control-api-stop'), 50);
    return;
  }

  return sendJson(res, 404, { ok: false, message: 'not found' });
});

function shutdown(reason) {
  if (shuttingDown) return;
  shuttingDown = true;
  log(`manager shutdown requested reason=${reason}`);

  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }

  controlServer.close(() => {
    log('control server closed');
  });

  if (!terminateChild()) {
    process.exit(0);
  }

  const forceExitTimer = setTimeout(() => {
    log('forcing manager shutdown after grace period');
    process.exit(0);
  }, 5000);
  forceExitTimer.unref();

  const poll = setInterval(() => {
    if (!child) {
      clearInterval(poll);
      process.exit(0);
    }
  }, 100);
  poll.unref();
}

controlServer.listen(CONTROL_PORT, '127.0.0.1', () => {
  log(`control API listening on http://127.0.0.1:${CONTROL_PORT}`);
  log(`health check target http://127.0.0.1:${APP_PORT}/api/health`);
  startChild();
});

const healthTimer = setInterval(healthCheck, HEALTH_INTERVAL_MS);
healthTimer.unref();

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('uncaughtException', (error) => {
  log(`uncaught exception: ${error.stack || error.message}`);
  shutdown('uncaughtException');
});
process.on('unhandledRejection', (reason) => {
  log(`unhandled rejection: ${reason}`);
});
