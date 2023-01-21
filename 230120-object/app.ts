// 타입스크립트는 어떤 정보도 주지 않는 객체가 있다고 이해
// 그래서 person.name 오류
// const person: object = {
//   name: 'zzbtang',
//   age: 32,
// };

// 객체 구조에 대한 정보를 제공하는 객체 타입을 선언..?
// 자바스크립트 객체를 생성하는 게 아닌
// 작업 중인 객체를 타입스크립트가 이해할 수 있도록 해주는 객체타입의 타입스크립트 표현
const person: {
  name: string;
  age: number;
} = {
  name: 'zzbtang',
  age: 32,
};

console.log(person.name);

// 이게 더 나은 구문
/* const person = {
  name:"zzbtang",
  age:30,
};

console.log(person.name);
*/
