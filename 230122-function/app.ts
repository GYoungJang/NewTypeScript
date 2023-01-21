// 함수의 매개변수에 타입을 할당할 수 있다.
// 더 중요한 것은 반환 타입
// 반환 타입은 타입스크립트가 추론함.

function add(n1: number, n2: number) {
  return n1 + n2;
}

// 흥미로운 것은 printResult의 반환 타입
// 이 함수는 아무것도 반환하지 않음
// 함수의 반환 타입은 void
// printResult가 undefined를 반환하더라도 void
// undefined는 JS에서는 값, TS에서는 타입
// 함수가 undefined를 비롯해 아무것도 반환하지 않는다면
// void를 사용해야 함.
// void를 사용하는 것은 함수에 의도적으로 반환문이
// 없다는 것을 의미하는 것
// 함수의 반환 타입에 undefined를 입력하면
// 타입스크립트는 값을 반환하지 않는 반환문이 있을 거라고 여김(return;)
// void는 반환문이 없을 때 쓰이는 타입
// 드물게 쓰이는 undefined는 실제 값을 반환하지 않을 때 사용

function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(5, 12));

// 콜백함수
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
});

// 타입이 함수 그 자체..
// let combineValues: Function;
let combineValues: (a: number, n: number) => number;

combineValues = add;

console.log(combineValues(8, 8));
