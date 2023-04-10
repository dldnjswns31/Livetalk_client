# 카카오톡 클론 코딩

혼자서 서버까지 완성하는 풀스택 프로젝트를 진행하고 싶어서 주제를 찾던 와중, socket.io를 사용하는 실시간 채팅에 눈길이 갔습니다.
가장 대중적인 메신저 앱인 카카오톡을 참고하여, 프로젝트를 진행했습니다.

이 레포지토리는 프로젝트의 Client 부분입니다.

## 배포

배포 예정중입니다.

## 사용 기술

- React
- Typescript
- Axios
- Styled-components
- Redux
- Socket.io

## 구현 기능

### 1. 회원가입

간단한 입력을 통해 회원가입을 진행할 수 있습니다.
![스크린샷 2023-04-10 오후 4 16 00](https://user-images.githubusercontent.com/71388830/230848598-9b471bb6-abec-4c3f-aee9-e8d49fdc1f99.png)

입력칸의 유효성을 통과 못하면 에러 피드백을 제공하고, 버튼이 비활성화 됩니다.
![회원가입](https://user-images.githubusercontent.com/71388830/230849210-12aa8b62-9b68-4ae3-b9c2-6b3c06c5669a.gif)

### 2. 로그인

회원가입 후 로그인이 가능합니다. 회원가입과 마찬가지로 에러 피드백을 제공하며, 유효성 검사를 통과해야지만 버튼이 활성화 됩니다.
![로그인 스크린샷](https://user-images.githubusercontent.com/71388830/230849476-a8451e44-9c0e-432d-9724-96dcab83cf6e.png)

로그인 시 서버로부터 JWT를 발급받아 로컬스토리지에 저장하며, 채팅 화면에서 JWT가 없거나, 검증에 실패한다면 로그인 화면으로 돌아오게 됩니다.
![JWT 검증 실패](https://user-images.githubusercontent.com/71388830/230850588-2a9f566d-7281-49d2-8337-fbd0b1cd1f8d.gif)

### 3. 유저 목록

모든 유저의 목록과 닉네임 옆의 빨간불/초록불을 통해 접속/미접속을 확인할 수 있습니다.
![유저 목록](https://user-images.githubusercontent.com/71388830/230851344-52e4a903-a5d2-497f-8b93-90ca7154e916.png)

유저를 클릭하면 해당 유저와의 채팅방이 열리게 됩니다.
![대화방목록 클릭](https://user-images.githubusercontent.com/71388830/230883700-24816769-9ec2-4646-ac29-312973b4cb2d.gif)

### 4. 채팅 목록

유저가 채팅했던 대화방들을 볼 수 있습니다. 각 대화방 목록에서 마지막 메세지와 시간을 확인할 수 있습니다.
![채팅방 목록](https://user-images.githubusercontent.com/71388830/230851968-85b9984b-383d-4809-a5fa-065b8d1eac6d.png)

다른 유저가 나에게 메세지를 보낸다면, 미확인한 메세지의 수를 알려줍니다. 메세지를 확인한다면 대화방의 미확인 메세지의 수가 초기화됩니다.
![대화목록 미확인메세지 확인](https://user-images.githubusercontent.com/71388830/230884858-fb6a99d0-af75-4ad6-9046-5c8fd8c449c5.gif)

### 5. 채팅방

유저와 실시간으로 채팅이 가능합니다.
![실시간 채팅](https://user-images.githubusercontent.com/71388830/230889078-27e14a58-aa8a-4217-8bab-89ccc7b96185.gif)

상대가 미확인 메세지를 확인했을 경우, 채팅방 메세지별 미확인 표시(숫자 1)이 사라지게 됩니다.
![채팅방 미확인 메세지 확인](https://user-images.githubusercontent.com/71388830/230889756-94717bef-35c7-4ff4-8d67-885148e8692d.gif)

스크롤 페이징을 구현하여 유저와의 모든 채팅내역을 가져오는것이 아닌, 순차적으로 데이터를 서버에 요청함으로써, 리소스의 낭비를 최소화시켰습니다.
![스크롤페이징](https://user-images.githubusercontent.com/71388830/230890405-37f8a45e-2733-4f99-af6a-684a35fd3b65.gif)

## 실행 방법

```
// 프로젝트 클론
git clone https://github.com/dldnjswns31/Livetalk_client.git
cd Livetalk_client

// .env 파일 생성 후 내용 작성
VITE_SERVER_URL=서버주소

// 패키지 설치 후 실행 (5173 포트에서 작동)
npm i
npm run dev
```

## 추가 구현 목록

- 로그아웃
- 회원 프로필 수정
- 채팅방 사진 업로드
- 채팅 삭제 및 채팅방 삭제
