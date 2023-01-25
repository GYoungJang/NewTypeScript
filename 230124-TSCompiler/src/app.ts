let age;
age = 30;
const userName = 'zzbtang';
console.log(userName);

// 어떻게 타입스크립트는 document, button 등이 있는지 알까..?
// 바닐라 자바스크립트에서는 당연하다고 여겨지지만
// 타입스크립트는 반드시 브라우저를 위해서 작성되는 것이 아님을
// 염두에 두어야 함...

// lib 옵션 덕분에 작동함..
// 주석처리가 되어 있더라도 일부 기본 설정이 적용
// 기본 설정은 자바스크립트의 target에 따라 달라짐
// 주석처리를 해제하면 기본 설정이 적용되지 않음
const button = document.querySelector('button')!;

function clickHandler(message: string) {
  // let userName = 'zzbtang';
  console.log('Clicked', message);
}

// 왜 bind를 써야하는지 모르겠다...ㅜ
button.addEventListener('click', clickHandler.bind(null, '1333'));
