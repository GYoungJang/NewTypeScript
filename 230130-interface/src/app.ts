interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'zzbtang',
  age: 32,

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
};

user1.greet('Hi there - I am');

interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {}

let user2: Greetable;

user2 = {
  name: 'zzb',
  greet(phrase: string) {
    console.log(phrase + this.name);
  },
};
