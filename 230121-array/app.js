// 배열타입은 자료형의 구분 없이 어떠한 데이터도 저장 가능
// 타입스크립트는 어떤 자바스크립트 배열이든 지원하며 배열의 타입을
// 유연하게도 제한적으로도 지정 가능
var person = {
    name: 'zzbtang',
    age: 30,
    hobbies: ['Sports', 'Cooking']
};
var favoriteActivities;
favoriteActivities = ['Sports'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
