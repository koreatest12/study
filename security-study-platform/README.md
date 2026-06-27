# 정보보안기사 학습 플랫폼

> 생성일: 2026-06-27  
> 목적: 정보보안기사 공부 자료, 문제풀이, 오답노트, 홈페이지, 서버 API를 하나의 구조로 관리합니다.

---

## 1. 전체 구조

```text
security-study-platform/
├─ README.md
├─ package.json
├─ server.js
├─ data/
│  └─ questions.json
├─ public/
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
├─ docs/
│  ├─ architecture.md
│  └─ homepage-structure.md
└─ study-materials/
   ├─ 01_system_security_deep.md
   ├─ 02_network_security_deep.md
   ├─ 03_application_security_deep.md
   ├─ 04_information_security_general_deep.md
   ├─ 05_management_law_deep.md
   └─ problem_bank_100.md
```

---

## 2. 실행 방법

### Node.js 설치 후 실행

```bash
cd security-study-platform
npm install
npm start
```

브라우저에서 접속:

```text
http://localhost:3000
```

---

## 3. 제공 기능

| 기능 | 설명 |
|---|---|
| 홈페이지 | 과목별 학습 카드, 문제풀이, 오답노트 UI |
| 문제 API | `/api/questions`로 JSON 문제 목록 제공 |
| 랜덤 문제 API | `/api/quiz/random`으로 랜덤 문제 제공 |
| 과목별 필터 | `/api/questions?subject=network` 형태로 과목 필터링 |
| 정답 확인 | 프론트엔드에서 선택지 클릭 후 정답/해설 표시 |
| 오답노트 | 브라우저 localStorage 기반 오답 저장 |
| 학습 자료 | 과목별 심화 Markdown 자료 포함 |

---

## 4. 과목 코드

| 코드 | 과목 |
|---|---|
| system | 시스템 보안 |
| network | 네트워크 보안 |
| application | 어플리케이션 보안 |
| general | 정보보안 일반 |
| management | 정보보안 관리 및 법규 |

---

## 5. 개발/확장 아이디어

- 문제 수를 300문제 이상으로 확장
- 로그인 기능 추가
- 진도율 저장 기능 추가
- 과목별 점수 통계 추가
- GitHub Pages 배포 구조 추가
- Express API와 정적 사이트 분리
- SQLite 또는 JSON DB 기반 학습 이력 저장
