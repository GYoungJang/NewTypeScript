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
const pers = new Person();
console.log(pers);

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  // 클래스의 내용을 출력하고 싶을 때
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // console.log('Rendering template');
    // const hookEl = document.getElementById(hookId);
    // const p = new originalConstructor();
    // if (hookEl) {
    //   hookEl.innerHTML = template;
    //   hookEl.querySelector('h1')!.textContent = p.name;
    // }
    // 데코레이터를 더한 새로운 클래스 반환 - 컨스트럭터 함수의 문법적 설탕인 클래스
    return class extends originalConstructor {
      constructor(..._: any[]) {
        // originalConstructor 호출
        super();
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        // const p = new originalConstructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
          // hookEl.querySelector('h1')!.textContent = p.name;
        }
      }
    };
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

// 메타 데코레이터에서 디스크립터를 반환할 수 있음
// 메서드나 메서드의 구성을 변경할 수 있어야 함

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // 여기서 this는 getter 메서드를 대체.. 참조??
      // this는 getter 메서드를 트리거하는 것은 뭐든지 참조
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;

// 클릭하면 undefined 출력
// 이벤트 리스너를 이용했을떄 함수를 지목하면 그 함수가 실행되어야 하는데
// 그 함수 안에 있는 this 키워드의 컨텍스트나 레퍼런스가
// p.showMessage를 호출했을 때와 동일하지 않기 때문
// 이 경우 이벤트 리스너를 사용하면 this는 이벤트의 대상을 참조
// addEventListener가 결국 실행되어야 하는 함수 안에 있는 this를
// 이벤트의 대상과 바인딩하기 때문
// button.addEventListener('click', p.showMessage);
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);

// 유효성 검증용 데코레이터
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required','positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive',
    ],
  };
}

// function Required(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: ['required'],
//   };
// }

// function PositiveNumber(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: ['positive'],
//   };
// }

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  // 뭐 이렇게 유효성 검사를 할 수도 있긴 한데..
  // if(title.trim().length>0){

  // }
  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again');
  }
  console.log(createdCourse);
});
