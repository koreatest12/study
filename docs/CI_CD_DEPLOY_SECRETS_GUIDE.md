# GitHub Actions CI/CD 배포 Secrets 설정 가이드

> 대상 워크플로우: `.github/workflows/정보수집.yml`  
> 오류 메시지: `Error: can't connect without a private SSH key or password`

---

## 1. 오류 원인

`appleboy/scp-action`은 원격 서버에 SCP로 접속할 때 SSH 개인키 또는 비밀번호가 필요합니다.

기존 오류는 아래 Secrets 중 인증 정보가 비어 있어서 발생했습니다.

```text
DEPLOY_HOST
DEPLOY_USER
DEPLOY_KEY 또는 DEPLOY_PASSWORD
```

특히 아래 메시지는 SSH 개인키도 없고 비밀번호도 없다는 뜻입니다.

```text
Error: can't connect without a private SSH key or password
```

---

## 2. 필수 GitHub Secrets

GitHub 저장소에서 아래 경로로 이동합니다.

```text
Repository → Settings → Secrets and variables → Actions → New repository secret
```

### 필수값

| Secret 이름 | 설명 | 예시 |
|---|---|---|
| DEPLOY_HOST | 배포 대상 서버 IP 또는 도메인 | `1.2.3.4` 또는 `example.com` |
| DEPLOY_USER | SSH 접속 사용자 | `ubuntu`, `ec2-user`, `root` |
| DEPLOY_KEY | SSH 개인키 | `-----BEGIN OPENSSH PRIVATE KEY-----`로 시작하는 값 |

### 비밀번호 방식 사용 시

| Secret 이름 | 설명 |
|---|---|
| DEPLOY_PASSWORD | SSH 비밀번호 |

SSH Key 방식이 더 권장됩니다. 비밀번호 방식을 쓸 경우 `DEPLOY_KEY`는 비워두고 `DEPLOY_PASSWORD`를 설정하면 됩니다.

### 선택값

| Secret 이름 | 설명 |
|---|---|
| DEPLOY_HOST_IP_OR_DOMAIN | Ping 테스트 대상. 없으면 DEPLOY_HOST를 사용 |

---

## 3. SSH Key 생성 예시

로컬 PC 또는 서버에서 아래 명령어를 실행합니다.

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f github-actions-deploy
```

생성 파일:

```text
github-actions-deploy      # 개인키, GitHub Secret DEPLOY_KEY에 등록
github-actions-deploy.pub  # 공개키, 서버의 authorized_keys에 등록
```

---

## 4. 서버에 공개키 등록

배포 서버에 접속 후 아래처럼 등록합니다.

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cat github-actions-deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## 5. DEPLOY_KEY 등록 시 주의사항

`DEPLOY_KEY`에는 개인키 전체 내용을 그대로 넣어야 합니다.

예시:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

주의:

- 공개키 `.pub` 파일을 넣으면 안 됩니다.
- 줄바꿈을 유지해야 합니다.
- Passphrase가 있는 키를 사용하면 추가 설정이 필요합니다.

---

## 6. 이번 워크플로우 수정 사항

수정된 워크플로우는 이제 Secrets가 없다고 실패하지 않습니다.

동작 방식:

```text
1. CI 빌드와 아티팩트 생성은 항상 수행
2. CD 단계에서 배포 Secrets 사전 검사
3. DEPLOY_HOST, DEPLOY_USER, DEPLOY_KEY 또는 DEPLOY_PASSWORD가 있으면 SCP 배포 수행
4. Secrets가 부족하면 배포만 건너뛰고 검증 단계는 계속 수행
```

---

## 7. 필요한 Secrets 조합

### SSH Key 방식 권장

```text
DEPLOY_HOST=서버 IP 또는 도메인
DEPLOY_USER=ubuntu
DEPLOY_KEY=개인키 전체 내용
DEPLOY_HOST_IP_OR_DOMAIN=서버 IP 또는 도메인 선택
```

### Password 방식

```text
DEPLOY_HOST=서버 IP 또는 도메인
DEPLOY_USER=ubuntu
DEPLOY_PASSWORD=서버 SSH 비밀번호
DEPLOY_HOST_IP_OR_DOMAIN=서버 IP 또는 도메인 선택
```

---

## 8. 서버 경로 권한 확인

워크플로우는 기본적으로 아래 경로에 배포합니다.

```text
/var/www/data-server/
```

서버에서 해당 사용자가 쓰기 권한을 가져야 합니다.

예시:

```bash
sudo mkdir -p /var/www/data-server
sudo chown -R ubuntu:ubuntu /var/www/data-server
```

`ubuntu` 부분은 실제 `DEPLOY_USER`에 맞게 변경해야 합니다.
