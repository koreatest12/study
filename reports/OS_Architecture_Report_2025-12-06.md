# 💻 운영체제(OS) 심층 분석 보고서

**작성일:** 2025-12-06
**주제:** 정보보안기사 대비 운영체제 핵심 이론 정리

---

## 1. 운영체제 개요 및 구조

### 1.1 커널(Kernel)과 쉘(Shell)
* **커널(Kernel):** OS의 핵심으로, 하드웨어(CPU, 메모리, 디스크)를 직접 제어하고 프로세스/메모리/IO를 관리합니다.
  - **커널 모드(Kernel Mode):** 모든 자원에 접근 가능한 특권 모드.
  - **유저 모드(User Mode):** 애플리케이션이 실행되는 제한된 모드. 시스템 호출(System Call)을 통해 커널 모드로 전환됩니다.
* **쉘(Shell):** 사용자와 커널 사이의 인터페이스(명령어 해석기). (예: bash, zsh, powershell)

### 1.2 시스템 호출 (System Call)
* 사용자 프로그램이 커널의 기능을 요청할 때 사용하는 인터페이스 (예: `fork()`, `exec()`, `open()`, `read()`).

---

## 2. 프로세스 관리 (Process Management)

### 2.1 프로세스와 스레드
* **프로세스(Process):** 실행 중인 프로그램. 메모리에 적재되어 CPU를 할당받는 작업 단위. (PCB를 가짐)
* **스레드(Thread):** 프로세스 내에서 실행되는 흐름의 단위. Code/Data/Heap은 공유하고 Stack은 개별 할당.

### 2.2 프로세스 상태 전이 (State Transition)
1. **생성(New):** 프로세스 생성.
2. **준비(Ready):** CPU 할당을 기다리는 상태.
3. **실행(Running):** CPU를 차지하여 명령어 실행 중.
4. **대기(Blocked/Wait):** I/O 작업 완료 등을 기다리는 상태.
5. **종료(Terminated):** 실행 완료.

### 2.3 스케줄링 (Scheduling)
* **선점형(Preemptive):** OS가 강제로 CPU를 빼앗을 수 있음. (Round Robin, SRT, Multi-level Queue)
* **비선점형(Non-Preemptive):** 프로세스가 스스로 반납할 때까지 대기. (FCFS, SJF, HRN)

### 2.4 교착상태 (Deadlock) ⚠️ *보안기사 필수 암기*
프로세스들이 서로 자원을 점유하고 놓지 않아 무한 대기하는 상태.

#### 발생의 4가지 필요충분조건
1. **상호 배제 (Mutual Exclusion):** 한 번에 한 프로세스만 자원 사용.
2. **점유와 대기 (Hold and Wait):** 자원을 가진 채 다른 자원을 기다림.
3. **비선점 (No Preemption):** 다른 프로세스의 자원을 뺏을 수 없음.
4. **환형 대기 (Circular Wait):** 대기 관계가 원형을 이룸.

#### 해결 기법
* **예방:** 4가지 조건 중 하나를 부정.
* **회피:** 은행원 알고리즘(Banker's Algorithm) 사용 (안전 상태 유지).
* **탐지 및 회복:** 자원 할당 그래프 등을 통해 탐지 후 프로세스 강제 종료.

---

## 3. 메모리 관리 (Memory Management)

### 3.1 가상 메모리 (Virtual Memory)
물리 메모리보다 큰 프로그램을 실행하기 위해 보조기억장치(Disk)를 메모리처럼 사용하는 기법.

### 3.2 페이징(Paging) vs 세그멘테이션(Segmentation)
| 구분 | 페이징 (Paging) | 세그멘테이션 (Segmentation) |
|:---:|:---|:---|
| **단위** | 고정 크기 (Page) | 가변 크기 (Segment) |
| **특징** | 물리 메모리를 Frame으로 나눔 | 논리적 단위(함수, 배열 등)로 나눔 |
| **장점** | 외부 단편화 해결 | 내부 단편화 해결, 보안/공유 용이 |
| **단점** | **내부 단편화** 발생 | **외부 단편화** 발생 |

### 3.3 페이지 교체 알고리즘 (Page Replacement)
* **FIFO:** 가장 먼저 들어온 페이지 교체.
* **LRU (Least Recently Used):** 가장 오랫동안 사용되지 않은 페이지 교체.
* **LFU (Least Frequently Used):** 참조 횟수가 가장 적은 페이지 교체.
* **NUR (Not Used Recently):** 참조 비트와 변형 비트를 사용.

---

## 4. 파일 시스템 (File System)

### 4.1 주요 파일 시스템
* **Windows:** FAT32 (보안 기능 미흡), **NTFS** (ACL, 암호화, 저널링 지원).
* **Linux:** **EXT4** (저널링 지원), XFS.

### 4.2 유닉스 파일 시스템 구조 (UFS)
* **Boot Block:** 부팅 시 필요한 코드.
* **Super Block:** 전체 파일 시스템 정보 (총 블록 수 등).
* **Inode List:** 파일의 메타데이터(소유자, 권한, 크기, 위치) 저장. **(파일명은 디렉터리에 저장됨)**
* **Data Block:** 실제 파일 데이터 저장.

---
*Report generated automatically via GitHub Actions.*
