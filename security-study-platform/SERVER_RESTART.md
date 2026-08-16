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
- SIGTERM/SIGINT 기반 graceful shutdown
- Health 응답에 PID와 uptime 포함

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

# 통합 GitHub Actions Workflow

Workflow 파일:

```text
.github/workflows/security-study-platform-ci.yml
```

기존 CI와 Pages 배포를 하나의 Workflow로 통합했습니다.

## PR / 기능 브랜치 자동 검증

1. Node.js 24 환경 구성
2. npm 의존성 설치
3. `package.json`, `data/questions.json` JSON 유효성 검사
4. `server.js`, `server-manager.js`, `server-control.js` 문법 검사 및 서버 모듈 로드
5. 학습 UI 핵심 정적 파일 존재 여부 확인
6. Managed Server 실행 및 `/api/health` 확인
7. `RESTART_TOKEN` 없이 Control API 접근 시 HTTP 401 확인
8. `npm run restart` 수동 재기동 후 PID 변경 확인
9. 자식 프로세스 강제 종료 후 자동 재기동 및 PID 변경 확인
10. 자식 프로세스를 일시 정지해 Health Check 연속 실패를 발생시키고 자동 재기동 확인
11. `status`, `start:service`, `stop` 제어 명령 확인
12. graceful shutdown 로그 확인
13. 상태 JSON, Health JSON, PID 변화, Manager 로그를 GitHub Actions Artifact로 14일 보존

## main 브랜치 Pages 배포

검증 Job이 성공한 경우에만 `security-study-platform/public`을 GitHub Pages로 배포합니다.

배포 Job 권한은 다음과 같이 최소 범위로 분리되어 있습니다.

```text
contents: read
pages: write
id-token: write
```

## 수동 실행

GitHub Actions 화면에서 `workflow_dispatch`로 실행할 수 있습니다. `main` 브랜치에서 수동 실행하면 검증 성공 후 Pages 배포까지 진행합니다.

## Workflow 로그 확인

재기동 테스트가 완료되면 `security-study-server-restart-logs-<run_number>` Artifact가 생성됩니다.

주요 파일:

- `server-manager.log`
- `health-before.json`
- `health-after-manual-restart.json`
- `health-after-crash-restart.json`
- `health-after-health-restart.json`
- `status-after-manual-restart.json`
- `status-after-crash-restart.json`
- `status-after-health-restart.json`
- `pid-summary.txt`

이를 통해 수동 재기동, 비정상 종료 자동 복구, Health Check 장애 자동 복구가 실제로 PID 교체까지 수행됐는지 확인할 수 있습니다.

## 권장 운영 방식

단일 PC 학습 서버라면 현재 관리자 방식으로 충분합니다. 장기 운영 또는 여러 서버를 관리해야 한다면 이후 PM2, systemd, Windows Service/NSSM, Docker Healthcheck 같은 운영 도구와 연계할 수 있습니다.
