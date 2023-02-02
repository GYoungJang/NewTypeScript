// 인터섹션 타입
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// 두 타입이 결합된 새 객체 타입
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'zzbtang',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// 타입 가드
// 원시 타입 가드

// 함수 오버로드
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  // 이 if문이 타입가드
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

// 함수 오버로드
// 타입스크립트는 result가 숫자형인지 문자열인지 알지 못함
// 형 변환을 사용해서 문자열 또는 숫자를 반환하라고 타입스크립트에게 알릴 수 있음
const result = add('zzb', ' tang'); //as string;
result.split(' ');

// 참조 타입 가드
// 두 사용자 정의 객체 타입을 사용하여 유니언 타입 생성
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name : ' + emp.name);
  // privileges 속성이 항상 있는 것인지 확신하지 못함
  // UnknownEmployee가 Employee일 수도 있잖아..
  // typeof로 검사하면 단지 객체라는 것만 알려줄 뿐 속성이 있는지는
  // 알려주지 않음
  // 그래서 in 키워드 사용
  if ('privileges' in emp) {
    console.log('Privileges : ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date : ' + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'zzb', startDate: new Date() });

// 클래스 이용시 타입 가드
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // loadCargo의 경우에는 Truck에만 존재해서
  // 타입 가드가 필요
  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(1000);
  // }
  // 이 방법이 더 깔끔
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// 구별된 유니언 타입
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // instanceOf는 사용 불가,
  // interface는 TS만 사용 가능하기 때문
  // if ('flyingSpeed' in animal) {
  //   console.log('Moving with speed: ' + animal.flyingSpeed);
  // }
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// 형 변환
// 커서를 올리면 HTMLParagraphElement거나 null
// const paragraph = document.querySelector('p');
// 커서를 올리면 HTML 요소나 null로 추론
// 어떤 특정 HTMl 요소인지는 몰라
// const paragraph = document.getElementById('message-output');

// 첫 번째 방법
// const userInputElement = <HTMLInputElement>(
//   document.getElementById('user-input')!
// );

// 두 번째 방법
// const userInputElement = document.getElementById(
//   'user-input'
// )! as HTMLInputElement;
// null일 수 있어서 에러 발생
// 느낌표를 추가해서 고칠 수 있음
// 느낌표는 느낌표 앞의 표현식을 null로 반환하지 않겠다고
// 타입스크립트에게 인식시키는 것
// 그래도 value에 에러가 발생
// value 속성을 가지지 않는 HTML 요소도 있기 때문에 에러 발생??
// 그래서 개발자가 직접 선택한 것이 단순히 null아니고
// HTML inputElement라는 것을 타입스크립트에게 알려줘야함
// 형 변환을 사용해서 구현할 수 있음
// 두 가지 방법이 존재
// 하나는 변환하고자 하는 요소 앞이나
// 타입스크립트에게 타입을 알려주고자 하는 위치 앞에
// 무언가를 추가하는 방법
// <HTMLInputElement>document.getElementById('user-input');
// 홑화살괄호 쌍 다음에 있는 것은 무엇이든
// TMLInputElement라는 것을 알게됨

// 두 번째는 선택한 부분 다음에 as 키워드를 입력
// as HTMLInputElement
// 그러면 as 앞의 표현식이 HTMLInputElement 타입의 값을 반환
// userInputElement.value = 'hi there';

// 이렇게도 가능, 느낌표를 사용하지 않고..
/*
const userInputElement = document.getElementById('user-input)
if(userInputElement) {
  (userInputElement as HTMLInputElement).value = 'hi there
}
*/

// 인덱스 타입
// 어떤 내용을 포함할지에 대해서는 유연해야함.
// 문제는 그 안에 정확히 어떤 속성 이름을 입력해야 할지 미리 알 수 없다는 것
// 웹페이지의 어떤 양식에서든 사용할 수 있게 하고자 하기 때문
// 여러 값과 식별자를 입력해야 하는 다양한 양식이 있을 수 있음
// 몇 개의 속성을 가질지, 어떤 속성이 어떤 이름을 가질지 미리 알 수 없음
// 이럴 때 인덱스 타입을 사용할 수 있음
interface ErrorContainer {
  // {email:'Not a valid email', username:'Must start with a character'}
  // 정확한 속성 이름을 모르고, 속성의 개수도 모르며
  // 에러 컨테이너 기반의 이 객체에 추가되는 모든 속성은
  // 문자열로 해석할 수 있는 속성 이름을 지녀야 한다는 것과
  // 해당 속성에 대한 값 역시 문자열이어야 한다는 것만 알고 있다고 입력
  // 그런데 인덱스 타입을 설정하게 되면
  // 인덱스 타입과 같은 타입인 속성만 추가할 수 있음
  // number 타입인 id 속성은 추가할 수 없음
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a capital character',
};

// 옵셔널 체이닝
// 백으로부터 이와 같은 데이터를 받았다고 가정
const fetchedUserDate = {
  id: 'u1',
  name: 'zzb',
  job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchedUserDate.job.title);

// 그런데 백에서 필요한 데이터를 모두 다 가져오지 못할 수 있음
// 자바스크립트적인 해결 방식
// 런타임 에러를 피할 수 있음
console.log(fetchedUserDate.job && fetchedUserDate.job.title);

// 타입스크립트의 옵셔널 체이닝 방식
// ? 역할은 해당 부분이 존재하는지를 알려주는 것
console.log(fetchedUserDate?.job?.title);

// null 병합

// const userInput = null;
// const storedData = userInput || 'DEFAULT';

// 위 방법의 문제점은 userInput의 값이 '' 빈문자열이라도
// falsy 값으로 처리가 됨
// 빈 상태와 null, undefined를 달리 처리하고 싶을때
// null 병합 연산자('??') 사용
// null이거나 undefined라면 DEFAULT
const userInput = '';
const storedData = userInput ?? 'DEFAULT';
console.log(userInput); // 빈 문자열 출력
