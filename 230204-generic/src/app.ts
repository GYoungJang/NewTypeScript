// const names = ['zzb', 'tang']; // 문자열 배열

// 어떤 데이터를 지니게 될지 아직 모른다 하더라도
// 배열 자체가 타입
// 배열 타입은 어떤 타입의 데이터가 저장되든 상관하지 않음
// 문자열, 숫자, 객체, 혼합 데이터든 상관하지 않지만
// 적어도 정보가 저장되는 것인지에 대해서는 확인을 함
// 아무것도 저장하지 않더라도..
// const names: any[] = [];
// 홑화살괄호 내에 배열에 전달되어야 하는 데이터의 타입을 지정
// const names: Array<string> = []; // string[]와 같음

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done!');
//   }, 2000);
// });

// 제네릭 함수
// 두 객체를 병합하고 새 객체 반환
function merge(obj1: object, obj2: object) {
  return Object.assign(obj1, obj2);
}

// 실행이 잘 되는데..
console.log(merge({ name: 'zzb' }, { age: 32 }));

// 에러가 발생
// name과 age에 접근할 수가 없음
// 타입스크립트가 모르고 알 수도 없기 때문에..
// 타입스크립트는 단지 객체를 반환하는 것으로 추론하기 때문..
// const mergedObj = merge({ name: 'zzb' }, { age: 32 });
// mergedObj.name;
// mergedObj.age;

// 그래서 형 변환으로 반환되는 것을 지정해주면 가능.. 근데 번거롭다
const mergedObj = merge({ name: 'zzb' }, { age: 32 }) as {
  name: string;
  age: number;
};
mergedObj.name;
mergedObj.age;

// 이럴 때 제네릭이 유용
// 타입스크립트는 이 함수가 T와 U의 인터섹션을 반환한다고 인식
// 함수를 정의할 때 타입들이 고정적으로 설정되지 않고
// 함수를 호출할 때 동적일 수 있도록 설정
// 제약조건 extends - 어떤 구조, 어떤 객체든 일단 T타입이 객체여야 한다는 것을 알려주기 위해서
function merge1<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// 타입스크립트는 병합된 객체에 저장된 요소가 두 객체의 인터섹션이라고 인식하게 됨

const mergedObj1 = merge1({ name: 'zzb' }, { age: 30 });
console.log(mergedObj1);
console.log(mergedObj1.name);
console.log(mergedObj1.age);
// mergedObj1.age;

// length 속성을 지니도록 보장하기 위해
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(''));
console.log(countAndDescribe(['sports', 'cooking']));
console.log(countAndDescribe([]));

// keyof 제약조건
// 에러가 발생하는 이유는 이 객체에 이 키가 있는지 보장할 수 없어서..
// function extractAndConvert(obj: object, key: string) {
//   return obj[key];
// }

// 제네릭 타입을 이용하여 해결
// 존재하지 않는 속성에 접근하는 실수를 방지할 수 있음
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

extractAndConvert({ name: 'zzb' }, 'name');

// 제네릭 클래스
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // 엉뚱한 item을 제거하지 않기 위해
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItem() {
    return [...this.data];
  }
}

// 문자열만 저장되는
const textStorage = new DataStorage<string>();
textStorage.addItem('zzb');
textStorage.addItem('tang');
textStorage.removeItem('zzb');
console.log(textStorage.getItem());

const numberStorage = new DataStorage<number>();

// 한 가지 문제
const objStorage = new DataStorage<object>();
objStorage.addItem({ name: 'zzb' });
objStorage.addItem({ name: 'tang' });
objStorage.removeItem({ name: '' });
// 객체는 indexOf가 작동하지 않음
// 따지고 보면 { name: 'zzb' } 이건 새 객체이기 때문
// 그래서 자바스크립트는 주소를 찾을 수 없어서 배열에서 마지막 요소를 제거하게 됨
// 자바스크립트가 아무것도 찾지 못한다면 indexOf가 -1을 반환
// 해결하기 위해서는 정확히 같은 객체를 전달해야함
// 그래서 상수에 객체를 할당
const zzbtangObj = { name: 'zzbtang' };
objStorage.addItem(zzbtangObj);
objStorage.removeItem(zzbtangObj);
console.log(objStorage.getItem());

// 그래서 원시 값하고만 작동하도록 하는 것이 더 나을 수 있음
// T extends string | number | boolean
// 그리고 따로 객체하고만 작동하는 보다 특화된 DataStorage가 필요

// ===========================================================
// Partial 타입
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// 이렇게 할 수도 있지만..
// function createCourse(
//   title: string,
//   description: string,
//   date: Date
// ): CourseGoal {
//   return { title, description, completeUntil: date };
// }

function createCourse(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // Partial 타입은 타입스크립트에게 중괄호 쌍이 courseGoal이 되는 객체임을 알려줌
  // 그런데 Partial 타입은 우리가 만든 타입 전체의 모든 속성이 선택적인 것으로 바꿈
  // Partial 타입은 객체 타입이나 인터페이스에 포함된 모든 속성을 일시적으로 선택적으로 바꿈
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// ===============================================
// Readonly 타입
// Readonly는 읽기만 가능하다고 알려준다
const names: Readonly<string[]> = ['zzb', 'tang'];
// names.push('zzbtang'); // 오류
