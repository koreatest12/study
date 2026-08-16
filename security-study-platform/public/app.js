const networkTopics = [
  ['OSI/TCP-IP','L2는 MAC/Frame, L3는 IP/Packet, L4는 TCP·UDP/Port. 장애 분석은 계층별로 범위를 좁힌다.'],
  ['IPv4·Subnet','CIDR로 네트워크/호스트 영역을 구분하고 Network·Broadcast·Host Range를 계산한다.'],
  ['ARP·ICMP','ARP는 같은 IPv4 네트워크에서 IP→MAC 해석, ICMP는 오류·진단에 사용된다.'],
  ['DNS·DHCP','DNS는 이름→주소 해석, DHCP는 Discover→Offer→Request→ACK 순서로 주소를 임대한다.'],
  ['VLAN·Routing','VLAN은 Broadcast Domain 분리, 라우팅은 Longest Prefix Match로 경로를 선택한다.'],
  ['Firewall·VPN','방화벽은 Source/Destination/Protocol/Port 정책으로 통제하고 VPN은 보호된 터널을 구성한다.']
];

const webTopics = [
  ['HTTP/HTTPS','HTTPS는 TLS로 기밀성·무결성·서버 인증을 제공하지만 애플리케이션 취약점을 자동 해결하지 않는다.'],
  ['SQL Injection','DB 쿼리 구조 변조. 핵심 대응은 Prepared Statement/Parameterized Query와 최소 권한이다.'],
  ['XSS','Stored·Reflected·DOM 기반. 컨텍스트별 Output Encoding, CSP, 안전한 DOM API가 핵심이다.'],
  ['CSRF','로그인 사용자의 브라우저를 이용한 요청 위조. CSRF Token, SameSite, Origin 검증, 재인증을 적용한다.'],
  ['Session Hijacking','유효 Session ID/Token 탈취. TLS, Secure·HttpOnly, 세션 만료·폐기, 이상 사용 탐지가 중요하다.'],
  ['Session Fixation','로그인 전 공격자가 아는 세션을 고정. 로그인 성공 직후 Session ID를 재생성한다.'],
  ['인증·인가·IDOR','Authentication은 신원, Authorization은 권한. 모든 객체 접근에 서버 측 권한 검증이 필요하다.'],
  ['File Upload·Path Traversal·SSRF','허용목록, 경로 검증, Web Root 분리, Outbound 통제로 공격 표면을 줄인다.'],
  ['WAF·로그','WAF 탐지는 공격 시도일 수 있다. Access/WAS/DB 로그를 상관분석해 실제 성공 여부를 판단한다.']
];

const interview = [
  ['IP로는 접속되지만 도메인으로 안 될 때?','IP 연결 확인 후 DNS 설정, nslookup 결과, DNS 서버 도달성, Cache/Record를 순서대로 확인합니다.'],
  ['443 포트가 안 열릴 때?','Route → Firewall/ACL → Load Balancer/WAF → TCP Listen → TLS Handshake/Certificate → Application 순으로 좁힙니다.'],
  ['WAF 탐지가 곧 침해인가?','아닙니다. 요청·응답 상태와 Web/WAS/DB 로그를 확인하여 공격 시도와 성공을 구분해야 합니다.'],
  ['장애 RCA를 어떻게 설명할 것인가?','증상 → 영향 범위 → 로그/지표 → 원인 → 조치 → 검증 → 재발방지 순서로 설명합니다.'],
  ['백업 성공과 복구 가능성의 차이는?','백업 Job 성공은 데이터 생성 여부이고, 복구 가능성은 실제 Restore Test로 검증해야 합니다.'],
  ['최소 권한 원칙은?','업무 수행에 필요한 최소 권한만 부여하고 정기 검토·회수·승인·로그 감사를 수행합니다.']
];

const quiz = [
  {q:'OSI 7계층에서 라우팅을 담당하는 계층은?', a:['L2','L3','L4','L7'], c:1, e:'Network 계층(L3)이 IP 주소와 라우팅을 담당합니다.'},
  {q:'192.168.10.70/26의 Network 주소는?', a:['192.168.10.0','192.168.10.32','192.168.10.64','192.168.10.128'], c:2, e:'/26 블록 크기는 64이며 70은 64~127 블록에 포함됩니다.'},
  {q:'TCP 3-Way Handshake 순서는?', a:['SYN→ACK→FIN','SYN→SYN/ACK→ACK','ACK→SYN→RST','FIN→ACK→SYN'], c:1, e:'연결 수립은 SYN → SYN/ACK → ACK 순서입니다.'},
  {q:'XSS의 대표 핵심 대응은?', a:['Output Encoding','Default Route','NAT','RAID'], c:0, e:'XSS는 출력 컨텍스트에 맞는 인코딩과 CSP 등이 핵심입니다.'},
  {q:'CSRF의 대표 대응은?', a:['CSRF Token','ARP Cache','STP','NTP'], c:0, e:'CSRF Token, SameSite, Origin/Referer 검증이 대표 대응입니다.'},
  {q:'Session Fixation의 핵심 대응은?', a:['로그인 후 Session ID 재생성','모든 Cookie 제거','DNSSEC','ICMP 차단'], c:0, e:'인증 성공 후 기존 세션을 폐기하고 새 Session ID를 발급합니다.'},
  {q:'IDOR 취약점의 근본 원인은?', a:['서버 측 권한 검증 누락','DNS 오류','MTU 오류','ARP Timeout'], c:0, e:'객체 식별자 변경 시에도 서버가 소유권/권한을 확인해야 합니다.'},
  {q:'SQL Injection의 핵심 방어는?', a:['Prepared Statement','Ping 차단','Cookie SameSite만','VLAN Trunk'], c:0, e:'Parameterized Query/Prepared Statement가 핵심 통제입니다.'},
  {q:'IP로 접속되지만 이름으로 안 될 때 우선 확인할 것은?', a:['DNS','RAID','CPU Fan','NTP만'], c:0, e:'L3 연결이 되므로 이름 해석 계층인 DNS를 우선 확인합니다.'},
  {q:'WAF 경보가 발생하면 가장 적절한 후속 조치는?', a:['즉시 침해 확정','Web/WAS/DB 로그로 성공 여부 확인','서버 종료','모든 포트 개방'], c:1, e:'공격 시도와 성공을 구분하기 위해 후속 로그 상관분석이 필요합니다.'}
];

const trouble = { q:'서버 IP에는 ping이 되지만 example.com으로는 접속되지 않습니다. 가장 먼저 확인할 명령은?', a:['ipconfig /all','nslookup','netstat -ano','arp -a'], c:1 };
const state = JSON.parse(localStorage.getItem('securityStudyState') || '{"solved":0,"correct":0,"wrong":[]}');
let currentQuiz = null;
function save(){ localStorage.setItem('securityStudyState', JSON.stringify(state)); renderStats(); renderWrong(); }
function renderStats(){ document.querySelector('#solvedCount').textContent = state.solved; document.querySelector('#correctCount').textContent = state.correct; document.querySelector('#wrongCount').textContent = state.wrong.length; document.querySelector('#accuracy').textContent = state.solved ? Math.round(state.correct/state.solved*100)+'%' : '0%'; }
function renderTopics(id, list){ document.querySelector(id).innerHTML = list.map(([t,d])=>`<article class="topic"><h3>${t}</h3><p>${d}</p></article>`).join(''); }
function showView(id){ document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active', v.id===id)); document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===id)); if(id==='quiz') newQuiz(); }
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
function ipToInt(ip){ const p=ip.trim().split('.').map(Number); if(p.length!==4 || p.some(n=>!Number.isInteger(n)||n<0||n>255)) throw new Error('올바른 IPv4 주소를 입력하세요.'); return (((p[0]<<24)>>>0)+(p[1]<<16)+(p[2]<<8)+p[3])>>>0; }
function intToIp(n){ return [n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join('.'); }
function subnetCalc(){ try{ const ip=ipToInt(document.querySelector('#ipInput').value); const cidr=Number(document.querySelector('#cidrInput').value); if(!Number.isInteger(cidr)||cidr<0||cidr>32) throw new Error('CIDR은 0~32 사이여야 합니다.'); const mask = cidr===0 ? 0 : (0xFFFFFFFF << (32-cidr))>>>0; const network=(ip&mask)>>>0; const broadcast=(network|(~mask>>>0))>>>0; const total = 2 ** (32-cidr); const usable = cidr<=30 ? Math.max(total-2,0) : total; const first = cidr<=30 ? network+1 : network; const last = cidr<=30 ? broadcast-1 : broadcast; document.querySelector('#subnetResult').textContent=`Network   : ${intToIp(network)}\nBroadcast : ${intToIp(broadcast)}\nFirst Host: ${intToIp(first>>>0)}\nLast Host : ${intToIp(last>>>0)}\nAddresses : ${total}\nUsable    : ${usable}`; }catch(e){ document.querySelector('#subnetResult').textContent=e.message; } }
document.querySelector('#subnetBtn').addEventListener('click', subnetCalc);
document.querySelector('#firewallBtn').addEventListener('click',()=>{ const p=Number(document.querySelector('#portInput').value); const allow=[80,443].includes(p); document.querySelector('#firewallResult').textContent = `${allow?'ALLOW ✅':'DENY ❌'}\n정책 근거: 서버망의 인터넷 Outbound는 TCP 80/443만 허용`; });
function renderTrouble(){ document.querySelector('#troubleQuestion').textContent=trouble.q; document.querySelector('#troubleOptions').innerHTML=trouble.a.map((x,i)=>`<button data-ti="${i}">${x}</button>`).join(''); document.querySelectorAll('[data-ti]').forEach(b=>b.addEventListener('click',()=>{ document.querySelector('#troubleResult').textContent=Number(b.dataset.ti)===trouble.c?'✅ 정답: DNS 이름 해석을 nslookup으로 확인합니다.':'❌ 다시 생각해보세요. IP 통신은 되므로 DNS를 우선 분리 진단합니다.'; })); }
function newQuiz(){ currentQuiz=quiz[Math.floor(Math.random()*quiz.length)]; document.querySelector('#quizBox').innerHTML=`<h3>${currentQuiz.q}</h3><div class="options">${currentQuiz.a.map((x,i)=>`<button data-qi="${i}">${i+1}. ${x}</button>`).join('')}</div><p id="quizResult"></p>`; document.querySelectorAll('[data-qi]').forEach(b=>b.addEventListener('click',()=>answerQuiz(Number(b.dataset.qi)))); }
function answerQuiz(i){ state.solved++; const ok=i===currentQuiz.c; if(ok) state.correct++; else if(!state.wrong.some(w=>w.q===currentQuiz.q)) state.wrong.push(currentQuiz); document.querySelector('#quizResult').innerHTML=`<strong>${ok?'✅ 정답':'❌ 오답'}</strong><br>${currentQuiz.e}`; save(); }
function renderWrong(){ const box=document.querySelector('#wrongList'); box.innerHTML=state.wrong.length?state.wrong.map(w=>`<article><strong>${w.q}</strong><p>${w.e}</p></article>`).join(''):'저장된 오답이 없습니다.'; }
document.querySelector('#newQuizBtn').addEventListener('click',newQuiz); document.querySelector('#clearWrongBtn').addEventListener('click',()=>{ state.wrong=[]; save(); });
renderTopics('#networkTopics', networkTopics); renderTopics('#webTopics', webTopics); renderTopics('#interviewList', interview); renderTrouble(); renderStats(); renderWrong(); newQuiz();
