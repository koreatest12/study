# 정보보안기사 공부 자료 인덱스

> 생성일: 2026-06-27  
> 목적: GitHub 저장소에 추가된 정보보안기사 공부 자료를 한눈에 확인하기 위한 인덱스입니다.

---

## 1. 메인 공부 자료

| 구분 | 파일 | 설명 |
|---|---|---|
| 과목별 종합 자료 | [2026-06-27_정보보안기사_과목별_공부자료.md](reports/2026-06-27_정보보안기사_과목별_공부자료.md) | 5과목 핵심 개념, 암기 포인트, 예상문제, 정답/해설 |
| 예상문제/오답노트 | [2026-06-27_정보보안기사_예상문제_오답노트.md](reports/2026-06-27_정보보안기사_예상문제_오답노트.md) | 과목별 예상문제와 오답노트 템플릿 |

---

## 2. 치트시트 자료

| 구분 | 파일 | 설명 |
|---|---|---|
| 포트번호 암기표 | [2026-06-27_정보보안기사_포트번호_암기표.md](cheatsheets/2026-06-27_정보보안기사_포트번호_암기표.md) | 네트워크 보안 핵심 포트 정리 |
| 암호학/접근통제 | [2026-06-27_정보보안기사_암호학_접근통제_요약.md](cheatsheets/2026-06-27_정보보안기사_암호학_접근통제_요약.md) | CIA, 암호, 해시, 전자서명, PKI, 접근통제 모델 |
| 웹 보안 취약점 | [2026-06-27_정보보안기사_웹보안_취약점_요약.md](cheatsheets/2026-06-27_정보보안기사_웹보안_취약점_요약.md) | SQL Injection, XSS, CSRF, 파일 업로드, 세션 보안 |

---

## 3. 학습 계획

| 구분 | 파일 | 설명 |
|---|---|---|
| 30일 학습계획 | [2026-06-27_정보보안기사_30일_학습계획.md](study_plan/2026-06-27_정보보안기사_30일_학습계획.md) | 30일 기준 과목별 회독 및 문제풀이 계획 |

---

## 4. GitHub 설정 수정 사항

| 구분 | 경로 | 처리 내용 |
|---|---|---|
| Dependabot 정상 설정 | [.github/dependabot.yml](.github/dependabot.yml) | Dependabot 전용 설정 파일 생성 |
| 잘못된 워크플로우 제거 | `.github/workflows/dependabot.yml` | GitHub Actions 오류 원인 파일 삭제 |

---

## 5. 공부 순서 추천

1. [30일 학습계획](study_plan/2026-06-27_정보보안기사_30일_학습계획.md)으로 전체 계획 확인
2. [과목별 공부자료](reports/2026-06-27_정보보안기사_과목별_공부자료.md) 1회독
3. 치트시트 3종 반복 암기
4. [예상문제/오답노트](reports/2026-06-27_정보보안기사_예상문제_오답노트.md)로 문제풀이
5. 틀린 개념은 다시 치트시트에 표시

---

## 6. 매일 반복 체크리스트

- [ ] 포트번호 10분 암기
- [ ] 암호학/접근통제 10분 암기
- [ ] 웹 보안 취약점 10분 암기
- [ ] 과목별 예상문제 10문제 풀이
- [ ] 오답노트 작성

---

## 7. GitHub Actions 오류 해결 요약

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
