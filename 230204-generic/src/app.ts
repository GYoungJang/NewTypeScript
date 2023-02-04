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
function merge1<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// 타입스크립트는 병합된 객체에 저장된 요소가 두 객체의 인터섹션이라고 인식하게 됨

const mergedObj1 = merge1({ name: 'zzb' }, { age: 20 });
mergedObj1.name;
mergedObj1.age;
