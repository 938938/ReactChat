# Chat ! - React.ver

ReactJS, 그리고 Node.js를 서버로 socket.io를 사용해 만들어 본 채팅웹입니다.<br>
현재 가장 기본적으로 실시간 채팅이 가능한 상태이며, 처음 입장시 채팅방을 설정할 수 있어 같은 채팅방에 들어간 이들끼리 대화를 나눌 수가 있습니다.<br>
유튜브 강의와 다양한 글을 참고로 하여 기틀을 만들었으며, 앞으로 기능을 확장해나갈 예정입니다.
<br>

---
<br>

입장시 화면(왼쪽)과 채팅 화면(오른쪽)
![ver1.0.0](https://user-images.githubusercontent.com/92746200/184900245-2c7c75c8-2071-4136-975e-85f172bc0070.png)

<br>

---
<br>

## 사용 방법
1. front와 server 폴더를 모두 받아주세요.
2. server 위치에서 npm i 혹은 npm install 을 통해 node modules를 다운받은 후 npm start를 실행해주세요.
3. front 위치에서 npm i 혹은 npm install 을 통해 node modules를 다운받은 후 npm start를 실행해주세요.
4. 대화를 나눠주세요!

## 업데이트 기록

- ver1.0.0 <br>
  기본적인 채팅 기능이 구현 되어있습니다. 처음 입장시 입력한 채팅방을 통해 대화를 주고받을 수 있습니다.
- ver1.0.1 <br>
  CSS 변경, styled-components 적용 ~~(App.js, Message.js 완료 - Chat.js 라이브러리 적용 문제)~~ - 완료
- ver1.0.2 <br>
  UUID 를 통한 메세지의 key값 할당 옵션 추가
  CSS 변경(MessageText)
- ver1.0.3 <br>
  메세지가 두 번 받아와지는 오류 해결
  (index.js에 있는 React.strictmode가 구성 요소를 두 번 매핑함으로 인해 생겨난 문제, 해당 태그를 삭제.)
- ver1.0.4 <br>
  채팅방에 새로운 유저의 접속 알림(알림:메세지 형식)

## 앞으로 업데이트 할 내용(예정, 순서 무관)

- 레이아웃 업데이트 : 진행 중
- 채팅방에 접속한 유저 목록 보기 기능 : 진행 중
- DB 연결
