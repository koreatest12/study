# 정보보안기사 공부 자료 인덱스

> 생성일: 2026-06-27  
> 목적: GitHub 저장소에 추가된 정보보안기사 공부 자료, 문제풀이, 홈페이지, 서버 구조를 한눈에 확인하기 위한 인덱스입니다.

---

## 1. 메인 공부 자료

| 구분 | 파일 | 설명 |
|---|---|---|
| 과목별 종합 자료 | [2026-06-27_정보보안기사_과목별_공부자료.md](reports/2026-06-27_정보보안기사_과목별_공부자료.md) | 5과목 핵심 개념, 암기 포인트, 예상문제, 정답/해설 |
| 예상문제/오답노트 | [2026-06-27_정보보안기사_예상문제_오답노트.md](reports/2026-06-27_정보보안기사_예상문제_오답노트.md) | 과목별 예상문제와 오답노트 템플릿 |
| 실전 모의고사 1회 | [2026-06-27_정보보안기사_실전모의고사_1회.md](quiz/2026-06-27_정보보안기사_실전모의고사_1회.md) | 총 25문항 문제풀이 및 해설 |

---

## 2. 과목별 심화정리

| 과목 | 파일 | 설명 |
|---|---|---|
| 시스템 보안 | [2026-06-27_시스템보안_심화정리.md](subjects/2026-06-27_시스템보안_심화정리.md) | 계정, 권한, 로그, 백업, 리눅스 파일 정리 |
| 네트워크 보안 | [2026-06-27_네트워크보안_심화정리.md](subjects/2026-06-27_네트워크보안_심화정리.md) | OSI 7계층, TCP/UDP, 보안 장비, 주요 포트 |
| 어플리케이션 보안 | [2026-06-27_어플리케이션보안_심화정리.md](subjects/2026-06-27_어플리케이션보안_심화정리.md) | 웹 보안, 입력값 검증, 인증과 세션 |
| 정보보안 일반 | [2026-06-27_정보보안일반_심화정리.md](subjects/2026-06-27_정보보안일반_심화정리.md) | CIA, AAA, 암호, 접근통제, 보안 모델 |
| 관리 및 법규 | [2026-06-27_관리및법규_심화정리.md](subjects/2026-06-27_관리및법규_심화정리.md) | ISMS, 위험관리, BCP/DRP, 개인정보 처리 원칙 |

---

## 3. 치트시트 자료

| 구분 | 파일 | 설명 |
|---|---|---|
| 포트번호 암기표 | [2026-06-27_정보보안기사_포트번호_암기표.md](cheatsheets/2026-06-27_정보보안기사_포트번호_암기표.md) | 네트워크 보안 핵심 포트 정리 |
| 암호학/접근통제 | [2026-06-27_정보보안기사_암호학_접근통제_요약.md](cheatsheets/2026-06-27_정보보안기사_암호학_접근통제_요약.md) | CIA, 암호, 해시, 전자서명, PKI, 접근통제 모델 |
| 웹 보안 취약점 | [2026-06-27_정보보안기사_웹보안_취약점_요약.md](cheatsheets/2026-06-27_정보보안기사_웹보안_취약점_요약.md) | SQL Injection, XSS, CSRF, 파일 업로드, 세션 보안 |

---

## 4. 홈페이지 및 서버 구조

| 구분 | 파일 | 설명 |
|---|---|---|
| Node.js 설정 | [package.json](package.json) | npm start, npm test 스크립트 포함 |
| 서버 | [server/index.js](server/index.js) | Express 기반 학습용 서버 |
| 데이터 검증 | [server/test.js](server/test.js) | JSON 문제 데이터 구조 검증 |
| 과목 데이터 | [data/subjects.json](data/subjects.json) | 5과목 메타데이터 |
| 문제 데이터 | [data/questions.json](data/questions.json) | 문제풀이 JSON 데이터 |
| 홈페이지 | [public/index.html](public/index.html) | 공부 홈페이지 메인 화면 |
| 디자인 | [public/style.css](public/style.css) | 반응형 UI 스타일 |
| 문제풀이 스크립트 | [public/app.js](public/app.js) | 과목/난이도 필터 및 자동 채점 |

---

## 5. 학습 계획

| 구분 | 파일 | 설명 |
|---|---|---|
| 30일 학습계획 | [2026-06-27_정보보안기사_30일_학습계획.md](study_plan/2026-06-27_정보보안기사_30일_학습계획.md) | 30일 기준 과목별 회독 및 문제풀이 계획 |

---

## 6. GitHub 설정 수정 사항

| 구분 | 경로 | 처리 내용 |
|---|---|---|
| Dependabot 정상 설정 | [.github/dependabot.yml](.github/dependabot.yml) | Dependabot 전용 설정 파일 생성 |
| 잘못된 워크플로우 제거 | `.github/workflows/dependabot.yml` | GitHub Actions 오류 원인 파일 삭제 |

---

## 7. 공부 순서 추천

1. [30일 학습계획](study_plan/2026-06-27_정보보안기사_30일_학습계획.md)으로 전체 계획 확인
2. [과목별 공부자료](reports/2026-06-27_정보보안기사_과목별_공부자료.md) 1회독
3. [과목별 심화정리](subjects/2026-06-27_시스템보안_심화정리.md) 자료 5개 회독
4. 치트시트 3종 반복 암기
5. [실전 모의고사 1회](quiz/2026-06-27_정보보안기사_실전모의고사_1회.md) 풀이
6. [예상문제/오답노트](reports/2026-06-27_정보보안기사_예상문제_오답노트.md)로 오답 관리
7. 홈페이지 문제풀이 기능으로 반복 채점

---

## 8. 홈페이지 실행 순서

```text
1. npm install
2. npm start
3. 브라우저에서 http://localhost:3000 접속
4. 과목 선택
5. 난이도 선택
6. 문제풀이
7. 채점하기
```

---

## 9. 매일 반복 체크리스트

- [ ] 포트번호 10분 암기
- [ ] 암호학/접근통제 10분 암기
- [ ] 웹 보안 취약점 10분 암기
- [ ] 과목별 심화정리 1개 읽기
- [ ] 과목별 예상문제 10문제 풀이
- [ ] 홈페이지 문제풀이 1세트 풀이
- [ ] 오답노트 작성

---

## 10. GitHub Actions 오류 해결 요약

기존 오류:

```text
Invalid workflow file
(Line: 1, Col: 1): Unexpected value 'version'
(Line: 4, Col: 1): Unexpected value 'updates'
(Line: 1, Col: 1): Required property is missing: jobs
```

원인:

```text
.github/workflows/dependabot.yml 위치에 Dependabot 설정을 넣어서
GitHub Actions가 워크플로우 파일로 해석했기 때문입니다.
```

해결:

```text
1. .github/workflows/dependabot.yml 삭제
2. .github/dependabot.yml 생성
3. Dependabot 설정은 version: 2 + updates 구조 유지
4. GitHub Actions workflow는 on:, jobs: 구조만 사용
```
