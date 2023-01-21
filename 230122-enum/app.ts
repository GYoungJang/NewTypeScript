// enum 타입은 중괄호 쌍 안에 식별자들을 넣어서 생성
// 열거 목록을 제공, 라벨들은 0부터 시작하는 숫자로 변환

// 자바스크립트 방식
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// const person = {
//   name: 'zzbtang',
//   age: 32,
//   hobbies: ['sports', 'cooking'],
//   role: ADMIN,
// };

// enum은 사용자 지정 타입
// 각 요소들은 숫자로 변환됨
// 기본은 0부터 시작 그러나 다르게 할당해줄 수도 있음. 문자열도 가능
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: 'zzbtang',
  age: 32,
  hobbies: ['sports', 'cooking'],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log('is admin');
}
