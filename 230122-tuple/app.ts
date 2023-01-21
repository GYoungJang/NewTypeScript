// 튜플은 타입과 길이가 고정된 배열

// const person = {
//   name: 'zzbtang',
//   age: 32,
//   hobbies: ['sports', 'cooking'],
//   role: [2, 'author'],
// };

// 타입스크립트는 role의 타입이 문자 혹은 숫자를 허용하는 배열이라는 것만 앎
// 첫 번째 요소가 숫자이고 두 번째 요소가 문자열이어야 한다는 것을 모름
// person.role.push('admin');
// person.role[1] = 10;

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // 튜플 타입
} = {
  name: 'zzbtang',
  age: 32,
  hobbies: ['sports', 'cooking'],
  role: [2, 'author'],
};

// person.role.push('admin'); // push는 예외적으로 튜플에서 허용...ㅜ
// person.role[1] = 10; // 에러

// person.role = [0, 'admin', 'user']; // 에러..
