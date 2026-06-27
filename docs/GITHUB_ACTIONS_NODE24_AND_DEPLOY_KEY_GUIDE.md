# GitHub Actions Node.js 24 전환 및 배포 키 처리 가이드

> 작성일: 2026-06-27  
> 대상: `.github/workflows/정보수집.yml`, `security-study-platform-ci.yml`, 기타 GitHub Actions 워크플로우

---

## 1. 발생한 경고

```text
Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24:
actions/checkout@v4, actions/setup-java@v4, actions/setup-python@v5, actions/upload-artifact@v4
```

이 메시지는 워크플로우 실패가 아니라 GitHub Actions가 Node.js 20 기반 Action을 Node.js 24 런타임으로 강제 실행하고 있다는 경고입니다.

---

## 2. 조치 방향

기존 Action 버전을 Node.js 24 대응 major 버전으로 올립니다.

| 기존 | 변경 |
|---|---|
| `actions/checkout@v4` | `actions/checkout@v5` |
| `actions/setup-node@v4` | `actions/setup-node@v5` |
| `actions/setup-java@v4` | `actions/setup-java@v5` |
| `actions/setup-python@v5` | `actions/setup-python@v6` |
| `actions/upload-artifact@v4` | `actions/upload-artifact@v5` |
| `actions/download-artifact@v4` | `actions/download-artifact@v5` |

---

## 3. 배포 키 다운로드 방식

보안상 SSH 개인키를 저장소 파일로 커밋하면 안 됩니다.

대신 GitHub Secret에 저장한 `DEPLOY_KEY`를 워크플로우 실행 중 runner 임시 경로에 파일로 생성합니다.

```yaml
- name: 🔑 DEPLOY_KEY 임시 파일 생성 및 검증
  id: deploy_key_file
  if: steps.deploy_check.outputs.can_deploy == 'true' && env.DEPLOY_KEY != ''
  shell: bash
  run: |
    KEY_FILE="$RUNNER_TEMP/deploy_key"
    printf '%s\n' "$DEPLOY_KEY" > "$KEY_FILE"
    chmod 600 "$KEY_FILE"

    if ssh-keygen -y -f "$KEY_FILE" > /dev/null 2>&1; then
      echo "✅ DEPLOY_KEY 개인키 형식 검증 완료"
    else
      echo "❌ DEPLOY_KEY 형식이 올바르지 않습니다."
      exit 1
    fi

    echo "key_path=$KEY_FILE" >> "$GITHUB_OUTPUT"
```

그 후 `appleboy/scp-action`에는 `key` 대신 `key_path`를 전달합니다.

```yaml
with:
  host: ${{ env.DEPLOY_HOST }}
  username: ${{ env.DEPLOY_USER }}
  key_path: ${{ steps.deploy_key_file.outputs.key_path }}
  source: "./deploy-package/*"
  target: "/var/www/data-server/"
```

---

## 4. GitHub Secrets 설정

GitHub 저장소에서 아래 경로로 이동합니다.

```text
Repository → Settings → Secrets and variables → Actions → New repository secret
```

### SSH Key 방식

```text
DEPLOY_HOST=서버 IP 또는 도메인
DEPLOY_USER=서버 SSH 사용자
DEPLOY_KEY=개인키 전체 내용
DEPLOY_HOST_IP_OR_DOMAIN=Ping 테스트용 IP 또는 도메인
```

### Password 방식

```text
DEPLOY_HOST=서버 IP 또는 도메인
DEPLOY_USER=서버 SSH 사용자
DEPLOY_PASSWORD=서버 SSH 비밀번호
DEPLOY_HOST_IP_OR_DOMAIN=Ping 테스트용 IP 또는 도메인
```

---

## 5. 주의사항

- `DEPLOY_KEY`에는 공개키가 아니라 개인키 전체 내용을 넣어야 합니다.
- 개인키는 저장소에 직접 커밋하면 안 됩니다.
- 워크플로우는 키를 `$RUNNER_TEMP/deploy_key`에만 임시 생성합니다.
- GitHub Actions 실행이 끝나면 runner 임시 파일은 사라집니다.
- `debug: true`는 문제 해결 후 `false`로 바꾸는 것이 더 안전합니다.

---

## 6. 이번 반영 내용

- `.github/workflows/정보수집.yml` Node.js 24 대응 Action 버전으로 변경
- `DEPLOY_KEY`를 임시 파일로 생성하는 단계 추가
- `ssh-keygen -y -f`로 개인키 형식 검증 추가
- SCP 배포를 `key_path` 방식으로 변경
- 비밀번호 방식 `DEPLOY_PASSWORD` fallback 유지
- Secrets가 없으면 배포만 스킵하고 CI 검증은 계속 수행
