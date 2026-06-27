# 정보보안기사 학습 플랫폼 아키텍처

## 1. 목적

이 플랫폼은 정보보안기사 공부 자료를 단순 Markdown 문서에만 두지 않고, 실제로 실행 가능한 학습 서버와 홈페이지로 확장하기 위한 구조입니다.

---

## 2. 구성요소

| 구성요소 | 경로 | 역할 |
|---|---|---|
| Express 서버 | `server.js` | 정적 페이지 제공, 문제 API 제공 |
| 문제 데이터 | `data/questions.json` | 과목별 객관식 문제와 해설 저장 |
| 홈페이지 | `public/index.html` | 학습 메인 화면 |
| 스타일 | `public/styles.css` | 반응형 UI와 카드 레이아웃 |
| 프론트엔드 로직 | `public/app.js` | 문제 출력, 정답 확인, 오답노트 저장 |
| 심화 자료 | `study-materials/*.md` | 과목별 상세 공부 자료 |
| 문서 | `docs/*.md` | 구조도, 홈페이지 설계 설명 |

---

## 3. 요청 흐름

```text
브라우저
  ↓
Express 서버
  ↓
/api/questions 또는 /api/quiz/random
  ↓
data/questions.json
  ↓
문제 + 선택지 + 정답 + 해설 반환
  ↓
브라우저에서 정답 확인 및 오답노트 저장
```

---

## 4. API 설계

### 상태 확인

```http
GET /api/health
```

응답 예시:

```json
{
  "status": "ok",
  "service": "information-security-engineer-study-platform",
  "timestamp": "2026-06-27T00:00:00.000Z"
}
```

### 전체 문제 조회

```http
GET /api/questions
```

### 과목별 문제 조회

```http
GET /api/questions?subject=network
```

### 랜덤 문제 조회

```http
GET /api/quiz/random
```

### 과목별 랜덤 문제 조회

```http
GET /api/quiz/random?subject=application
```

---

## 5. 데이터 구조

```json
{
  "id": 1,
  "subject": "network",
  "subjectName": "네트워크 보안",
  "question": "HTTPS의 기본 포트 번호는?",
  "choices": ["22", "53", "80", "443"],
  "answer": 3,
  "explanation": "HTTPS는 TCP 443 포트를 기본으로 사용한다."
}
```

주의:

- `answer`는 0부터 시작하는 선택지 인덱스입니다.
- 4번 선택지가 정답이면 `answer: 3`입니다.

---

## 6. 향후 확장 구조

```text
security-study-platform/
├─ server.js
├─ data/
│  ├─ questions.json
│  ├─ wrong-notes.json
│  └─ progress.json
├─ public/
├─ routes/
│  ├─ questions.js
│  ├─ wrong-notes.js
│  └─ progress.js
├─ services/
│  ├─ quizService.js
│  └─ scoreService.js
└─ database/
   └─ study.sqlite
```

---

## 7. 보안 고려사항

| 항목 | 설명 |
|---|---|
| 입력값 검증 | subject, limit 등 쿼리 파라미터 검증 필요 |
| 에러 메시지 | 운영 환경에서는 상세 오류 노출 제한 |
| 정적 파일 | public 폴더 외부 파일 노출 금지 |
| 저장소 공개 여부 | 문제 자료와 학습 기록 공개 범위 확인 |
| 개인정보 | 학습자 이름, 점수 등 개인정보 저장 시 보호조치 필요 |
