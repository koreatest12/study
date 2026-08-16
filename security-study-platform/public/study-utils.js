(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StudyUtils = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30, 60];

  function ipToInt(ip) {
    const parts = String(ip).trim().split('.').map(Number);
    if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
      throw new Error('올바른 IPv4 주소를 입력하세요.');
    }
    return (((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0;
  }

  function intToIp(value) {
    const n = Number(value) >>> 0;
    return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  }

  function calculateSubnet(ipText, cidrValue) {
    const ip = ipToInt(ipText);
    const cidr = Number(cidrValue);
    if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) throw new Error('CIDR은 0~32 사이여야 합니다.');
    const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const total = 2 ** (32 - cidr);
    const usable = cidr <= 30 ? Math.max(total - 2, 0) : total;
    const first = cidr <= 30 ? network + 1 : network;
    const last = cidr <= 30 ? broadcast - 1 : broadcast;
    return { cidr, network: intToIp(network), broadcast: intToIp(broadcast), firstHost: intToIp(first >>> 0), lastHost: intToIp(last >>> 0), addresses: total, usable };
  }

  function evaluateFirewallPort(portValue) {
    const port = Number(portValue);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('포트는 1~65535 범위여야 합니다.');
    const allowed = port === 80 || port === 443;
    return { allowed, verdict: allowed ? 'ALLOW' : 'DENY', reason: allowed ? '정책에 정의된 웹 아웃바운드 포트입니다.' : '정책은 TCP 80/443만 허용합니다.' };
  }

  function accuracy(correct, solved) {
    const total = Number(solved) || 0;
    return total > 0 ? Math.round(((Number(correct) || 0) / total) * 100) : 0;
  }

  function nextReview(streak, now = Date.now()) {
    const safeStreak = Math.max(0, Number(streak) || 0);
    const idx = Math.min(safeStreak, REVIEW_INTERVALS_DAYS.length - 1);
    return new Date(now + REVIEW_INTERVALS_DAYS[idx] * 86400000).toISOString();
  }

  function normalizeState(raw) {
    const base = { version: 3, solved: 0, correct: 0, wrong: [], bookmarks: [], progress: {}, reviewQueue: [], examHistory: [], lastStudyAt: null };
    if (!raw || typeof raw !== 'object') return base;
    return { ...base, ...raw, wrong: Array.isArray(raw.wrong) ? raw.wrong : [], bookmarks: Array.isArray(raw.bookmarks) ? raw.bookmarks : [], progress: raw.progress && typeof raw.progress === 'object' ? raw.progress : {}, reviewQueue: Array.isArray(raw.reviewQueue) ? raw.reviewQueue : [], examHistory: Array.isArray(raw.examHistory) ? raw.examHistory : [] };
  }

  function dueReviews(queue, now = Date.now()) {
    return (Array.isArray(queue) ? queue : []).filter((item) => {
      const due = Date.parse(item.reviewAt || '1970-01-01');
      return Number.isFinite(due) && due <= now;
    });
  }

  function formatBytes(bytes) {
    const value = Number(bytes) || 0;
    if (value < 1024) return `${value} B`;
    if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KB`;
    return `${(value / 1024 ** 2).toFixed(1)} MB`;
  }

  return { REVIEW_INTERVALS_DAYS, ipToInt, intToIp, calculateSubnet, evaluateFirewallPort, accuracy, nextReview, normalizeState, dueReviews, formatBytes };
});
