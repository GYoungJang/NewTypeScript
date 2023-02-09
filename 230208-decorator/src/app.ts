// class decorator
// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

// @Logger
// class Person {
//   name = 'zzb';

//   constructor() {
//     console.log('Creating person object');
//   }
// }

// const pers = new Person();
// console.log(pers);

// decorator factory
// 어떤 대상에 데코레이터를 할당할 때 설정할 수 있도록 해줌
// 데코레이션 함수가 사용하는 값을 커스터마이즈할 수 있다
// 반환되는 것이 실제 데코레이터
function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    // console.log('Logging...');
    console.log(logString);
    console.log(constructor);
  };
}

// 이 때는 함수 실행해야 내부 코드인 반환값이 따라붙음
// @Logger('LOGGING-PERSON')
// class Person {
//   name = 'zzb';

//   constructor() {
//     console.log('Creating person object');
//   }
// }

// const pers = new Person();
// console.log(pers);

// 템플릿과 함꼐 새 데코레이터 함수
// function WithTemplate(template: string, hookId: string) {
//   // 존재는 알지만 쓰지는 않을 때 _를 입력
//   return function (_: Function) {
//     const hookEl = document.getElementById(hookId);
//     if (hookEl) {
//       hookEl.innerHTML = template;
//     }
//   };
// }

@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'zzb';

  constructor() {
    console.log('Creating person object');
  }
}
// const pers = new Person();
// console.log(pers);

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  // 클래스의 내용을 출력하고 싶을 때
  return function (constructor: any) {
    console.log('Rendering template');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

// -------
// 어떤 데코레이터든 클래스를 정의할 때 실행이 됨
// 메소드를 불러내거나, 프로퍼티를 쓸 때 작동하는 것이 아님
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target); // 오브젝트의 프로토타입
  console.log(propertyName);
}

// accessor에 데코레이터 더하기
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  // 축약표현일 때는 데코레이터 어떻게 붙이지..
  //constructor(public title: string, private _price: number) {}

  @Log
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log2
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);
