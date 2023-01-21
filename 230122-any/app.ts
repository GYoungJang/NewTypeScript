// any 타입은 가장 유연한 타입
// 타입스크립트에 어떤 것도 이해시키지 않음
// 타입스크립트가 주는 모든 장점을 any가 상쇄시킴
// 바닐라 자바스크립트를 쓰는 것과 다를 바가 없음
// any 타입을 사용하는 모든 위치에서는 타입스크립트 컴파일러가
// 작동하지 않음

// 따라서 어떤 값이나 종류의 데이터가
//어디에 저장될지 전혀 알 수 없는 경우에 대비하거나
// 런타임 검사를 수행하는 경우
// 런타임 도중 수행하고자 하는 작업의 특정 값의 범위를 좁히기 위해
// any를 사용

const person = {
  name: 'zzbtang',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
};

let favoriteActivities: any[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
