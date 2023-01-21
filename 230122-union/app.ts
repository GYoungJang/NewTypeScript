// union 타입은 서로 다른 종류의 값을 사용해야 하는 경우에 사용
// 유니언 타입을 사용하면 코드에 적용한 매개변수를 보다 유연하게 사용할 수 있음.

function combine(
  input1: number | string,
  input2: number | string,
  // 유니언 타입과 리터럴 타입 결합
  // 다른 문자열 값은 허용하지 않음
  resultConversion: 'as-number' | 'as-text'
) {
  // 타입스크립트는 유니언 타입만 이해하고
  // 유니언 타입 내에 무엇이 있는지 모름..
  // 그래서 더하기 연산자를 사용할 수 없는 타입도 있을 거라고 이해해서
  // 에러를 내보냄
  // 그래서 런타임 검사를 추가
  // 이 추가적인 런타임 검사는 유니언 타입을 사용하여 작업할 때 종종 필요
  let result;
  // if (typeof input1 === 'number' && typeof input2 === 'number') {
  //   result = input1 + input2;
  // } else {
  //   result = input1.toString() + input2.toString();
  // }
  // if (resultConversion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

// 리터럴 타입 : 'as-number', 'as-text'
// enum을 사용해서 개선할 수 있음
const combineAges = combine(30, 26, 'as-number');
console.log(combineAges);

const combineStringAges = combine('30', '26', 'as-number');
console.log(combineStringAges);

const combineStringAges1 = combine('max', 'as', 'as-number'); // NaN
console.log(combineStringAges1);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
