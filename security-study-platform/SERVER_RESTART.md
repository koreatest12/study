# 서버 자동 재기동 관리자

`security-study-platform`에는 Node.js 기반 서버 프로세스 관리자와 제어 CLI가 포함되어 있습니다.

## 주요 기능

- Express 서버 자동 시작
- 비정상 종료 시 자동 재기동
- `/api/health` 연속 실패 시 자동 재기동
- 수동 상태 확인
- 수동 재기동
- 수동 시작
- 관리자/서버 정상 종료
- 제어 API를 `127.0.0.1`에만 바인딩
- 선택적으로 `RESTART_TOKEN`을 사용한 제어 명령 보호

## 설치

```powershell
cd security-study-platform
npm install
```

## 일반 실행

```powershell
npm start
```

이 방식은 Express 서버만 직접 실행합니다. 자동 재기동은 수행하지 않습니다.

## 자동 재기동 모드 실행

```powershell
npm run start:managed
```

기본값:

- 애플리케이션: `http://127.0.0.1:3000`
- Health Check: `http://127.0.0.1:3000/api/health`
- 관리자 제어 API: `http://127.0.0.1:3901`
- Health Check 간격: 15초
- Health Check 제한시간: 3초
- 3회 연속 실패 시 재기동

## 상태 확인

새 PowerShell 창에서:

```powershell
cd security-study-platform
npm run status
```

출력 예시:

```json
{
  "ok": true,
  "managerPid": 1234,
  "childPid": 5678,
  "running": true,
  "appPort": 3000,
  "controlPort": 3901,
  "restartCount": 0,
  "consecutiveHealthFailures": 0
}
```

## 수동 재기동

```powershell
npm run restart
```

관리자는 기존 서버 프로세스를 종료한 다음 새 서버 프로세스를 자동으로 실행합니다.

## 서버 시작 요청

관리자는 실행 중이지만 애플리케이션 프로세스가 없는 경우:

```powershell
npm run start:service
```

## 관리자와 서버 종료

```powershell
npm run stop
```

## 환경 변수

PowerShell 예시:

```powershell
$env:PORT="3000"
$env:CONTROL_PORT="3901"
$env:HEALTH_INTERVAL_MS="15000"
$env:HEALTH_TIMEOUT_MS="3000"
$env:HEALTH_FAILURE_THRESHOLD="3"
$env:RESTART_DELAY_MS="1500"
$env:RESTART_TOKEN="change-this-token"
npm run start:managed
```

다른 PowerShell 창에서 같은 토큰을 설정한 후 제어합니다.

```powershell
$env:RESTART_TOKEN="change-this-token"
npm run status
npm run restart
```

## 보안 원칙

관리자 제어 API는 외부 네트워크에 공개하지 않고 `127.0.0.1`에만 바인딩됩니다. 서버 재기동 기능을 인터넷에 직접 노출하는 것은 권장하지 않습니다.

운영 서버에서 원격 재기동이 필요하다면 공개 HTTP 엔드포인트를 만드는 대신 다음과 같은 운영 도구를 사용하는 것을 권장합니다.

- Windows Service
- systemd
- PM2
- Docker / Kubernetes
- CI/CD 배포 파이프라인

## Health Check

Express 서버의 `/api/health` 응답에는 현재 프로세스 PID와 uptime이 포함됩니다.

```json
{
  "status": "ok",
  "service": "information-security-engineer-study-platform",
  "pid": 5678,
  "uptimeSeconds": 120,
  "timestamp": "2026-08-16T00:00:00.000Z"
}
```

재기동 전후의 `pid`가 변경되는지 확인하면 실제 프로세스가 다시 시작됐는지 확인할 수 있습니다.

## 자동 재기동 동작

```text
Server Manager
     │
     ├── Express Server 실행
     │
     ├── /api/health 주기적 점검
     │       │
     │       ├── 정상 → 계속 운영
     │       │
     │       └── 연속 실패 → 서버 종료 → 재기동
     │
     └── 비정상 종료 감지 → 일정 시간 후 자동 재기동
```

## GitHub Actions 검증

`.github/workflows/security-study-platform-ci.yml`에서 다음을 자동 검증합니다.

1. Node.js 소스 문법 검사
2. 서버 관리자 실행
3. Health Check 성공 확인
4. `npm run restart` 실행
5. 재기동 후 Health Check 재확인
6. 상태 확인
7. 정상 종료

이 검증은 실제 운영 배포를 대신하는 것이 아니라 재기동 프로그램의 기본 동작을 확인하기 위한 Smoke Test입니다.
