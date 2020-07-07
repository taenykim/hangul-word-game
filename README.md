# 한글 단어만들기 게임

자음과 모음을 합쳐서 음절을 만들고 완전탐색으로 음절로 만들 수 있는 모든 단어 계산 후, 네이버 사전에 단어의 뜻 검색

## description

- 랜덤으로 자음모음이 상단에서 떨어짐 (30초간 지속되며 시간이 지나면 사라짐)
- keypress 이벤트로 원하는 자음모음 생성가능
- 30초간 지속되는 자음모음들은 드래그앤드랍으로 한음절을 만들 수 있다 (애니메이션 duration은 위치에 맞게 다시 계산됨)
- 만들어진 음절들은 서로 조합해 단어를 만든다.(완탐)
- 만들어진 단어들은 네이버 사전 API를 통해 단어 뜻과 함께 출력 예정

## test demo

https://hangul-word-game.vercel.app/

## todo

- 리팩토링
- 자음모음 합칠때, 순서 고려할지 안할지
- 버그:가끔 애니메이션이 kill 되지 않음
- 애니메이션 시, `top`을 `transform`으로 변경 (성능 더 좋아짐)
- 네이버 사전
- 완전탐색 알고리즘 (재귀로 할듯?!)
- 자음모음 합치기 전에 합칠 수 있는지 여부에 따라 `background-color` 속성 변경

## 사용 라이브러리

- [hangul-js](https://github.com/e-/Hangul.js) 자음모음을 분리하고 합치기 위해서 사용했음. 근데 `ㅏ + ㅣ => ㅐ` 이런거는 합쳐지지 않아서 직접 구현했다. [나와 동일한 이슈가 있었다.](https://github.com/e-/Hangul.js/issues/8)
- [gsap](https://github.com/greensock/GSAP) 동적 자바스크립트 애니메이션은 요거를 이용했다.
- [react](https://github.com/facebook/react) 리액트는 `jsx`라든가 `flux`라든가 리액트의 특장점을 이용하지는 않았다. 그냥 보일러플레이트 CRA가 편해서 사용했다.
