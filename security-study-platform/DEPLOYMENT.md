# Security Study Platform 배포 및 실행

## 목적
정보보안기사 필기·실기, 네트워크, 웹 보안, IT 인프라/보안 취업 준비를 한 화면에서 학습하는 개인 Study Server입니다.

## 포함 기능
- 학습 대시보드와 정답률
- 네트워크 핵심 개념
- 웹 보안 핵심 개념
- Subnet Calculator
- Firewall Rule LAB
- 장애분석 LAB
- TCP 3-Way Handshake 학습
- 정보보안기사 랜덤 문제
- localStorage 기반 오답노트/학습 통계
- IT 인프라·보안 기술면접 질문

## 로컬 실행
Node.js 환경에서는 기존 Express 서버를 사용할 수 있습니다.

```bash
cd security-study-platform
npm install
npm start
```

브라우저에서 `http://localhost:3000` 접속.

## 정적 실행
`security-study-platform/public/index.html`을 정적 웹 서버로 제공하면 브라우저 자체 기능만으로도 주요 학습 기능이 동작합니다.

## GitHub Pages
`.github/workflows/security-study-platform-pages.yml`이 `main`의 `security-study-platform/public`을 GitHub Pages에 배포합니다.

저장소 Settings → Pages에서 Source가 GitHub Actions로 설정되어 있어야 합니다. PR 병합 후 Workflow가 실행됩니다.

## 학습 데이터 저장
현재 풀이수·정답수·오답노트는 브라우저 `localStorage`에 저장됩니다. 서버 DB나 개인정보를 저장하지 않습니다.

## 권장 학습 순서
1. OSI/TCP-IP, Subnet, TCP/UDP, DNS/DHCP
2. VLAN/Routing/Firewall/VPN
3. HTTP/HTTPS, Cookie/Session
4. SQL Injection, XSS, CSRF, Session Hijacking/Fixation
5. 인증·인가, IDOR, File Upload, Command Injection, Path Traversal, SSRF
6. WAF/로그 분석
7. 정보보안기사 랜덤 문제 및 오답노트
8. 장애 RCA 및 기술면접 답변 훈련
