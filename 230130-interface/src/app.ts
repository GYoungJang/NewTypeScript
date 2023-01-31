// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// let user1: Person;

// user1 = {
//   name: 'zzbtang',
//   age: 32,

//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name);
//   },
// };

// user1.greet('Hi there - I am');

interface Named {
  readonly name?: string;
  // 선택적 속성
  // 인터페이스를 구현하는 클래스 내에
  // 있을 수 있지만 반드시 그렇지는 않다고
  // 인식함 타입스크립트가
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  age = 32;
  constructor(public name?: string) {
    if (name) {
      this.name = name;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('hi');
    }
  }
}

let user2: Greetable;

// user2 = {
//   name: 'zzb',
//   greet(phrase: string) {
//     console.log(phrase + this.name);
//   },
// };

user2 = new Person('1');

user2.greet('Hi There - I am');
console.log(user2);

// 사용자 정의 타입 함수
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
// 위의 사용자 타입의 대안으로 인터페이스 사용
interface AddFn1 {
  (a: number, b: number): number;
}

let add1: AddFn1;

add1 = (n1: number, n2: number) => {
  return n1 + n2;
};
