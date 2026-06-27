# 2과목 네트워크 보안 심화 정리

## 1. 핵심 범위

네트워크 보안은 OSI 7계층, TCP/IP, 주요 포트, 방화벽, IDS/IPS, VPN, 무선 보안, 네트워크 공격을 다룬다.

---

## 2. OSI 7계층

| 계층 | 이름 | 주요 장비/프로토콜 |
|---:|---|---|
| 7 | 응용 | HTTP, FTP, SMTP, DNS |
| 6 | 표현 | 암호화, 인코딩 |
| 5 | 세션 | 세션 관리 |
| 4 | 전송 | TCP, UDP |
| 3 | 네트워크 | IP, ICMP, Router |
| 2 | 데이터링크 | Ethernet, Switch, ARP |
| 1 | 물리 | Cable, Hub, Repeater |

---

## 3. 주요 공격

| 공격 | 설명 | 대응 |
|---|---|---|
| Spoofing | IP/MAC/DNS 등을 속임 | 인증, 필터링, 정적 ARP |
| Sniffing | 트래픽 도청 | 암호화, 스위칭, 탐지 |
| Session Hijacking | 세션 탈취 | HTTPS, 세션 재발급 |
| SYN Flooding | TCP 연결 대기 큐 고갈 | SYN Cookie, Rate Limit |
| Smurf Attack | ICMP 증폭 공격 | Broadcast 차단 |

---

## 4. 보안 장비

| 장비 | 역할 |
|---|---|
| Firewall | 접근통제 |
| IDS | 침입 탐지 |
| IPS | 침입 차단 |
| WAF | 웹 공격 방어 |
| NAC | 네트워크 접근 제어 |
| VPN | 터널링과 암호화 |

---

## 5. 예상문제

### 문제 1
SYN Flooding 공격의 주요 목표는?

1. TCP 연결 대기 큐 고갈
2. 파일 권한 변경
3. DB 쿼리 조작
4. 인증서 폐지

**정답: 1**

**해설:** SYN Flooding은 다수의 SYN 요청을 보내 서버의 연결 대기 자원을 고갈시킨다.

### 문제 2
Smurf 공격 대응으로 적절한 것은?

1. 브로드캐스트 패킷 차단
2. DB 권한 상승
3. 세션 시간 연장
4. 파일 업로드 허용

**정답: 1**

**해설:** Smurf 공격은 ICMP와 브로드캐스트를 악용하므로 브로드캐스트 차단이 중요하다.
