const http = require('http');

const CONTROL_PORT = Number(process.env.CONTROL_PORT || 3901);
const RESTART_TOKEN = process.env.RESTART_TOKEN || '';
const action = String(process.argv[2] || 'status').toLowerCase();

const actions = {
  status: { method: 'GET', path: '/status' },
  restart: { method: 'POST', path: '/restart' },
  start: { method: 'POST', path: '/start' },
  stop: { method: 'POST', path: '/stop' },
};

if (!actions[action]) {
  console.error('사용법: node scripts/server-control.js [status|restart|start|stop]');
  process.exit(2);
}

const target = actions[action];
const request = http.request(
  {
    hostname: '127.0.0.1',
    port: CONTROL_PORT,
    path: target.path,
    method: target.method,
    headers: RESTART_TOKEN ? { 'x-restart-token': RESTART_TOKEN } : {},
    timeout: 5000,
  },
  (response) => {
    let body = '';
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      body += chunk;
    });
    response.on('end', () => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(body || JSON.stringify({ ok: true }));
        process.exit(0);
      }

      console.error(body || `control API error: HTTP ${response.statusCode}`);
      process.exit(1);
    });
  }
);

request.on('timeout', () => request.destroy(new Error('control API timeout')));
request.on('error', (error) => {
  console.error(`서버 관리자에 연결할 수 없습니다: ${error.message}`);
  console.error(`관리자가 실행 중인지 확인하세요: npm run start:managed`);
  process.exit(1);
});

request.end();
