// unknown 타입
// 어떤 사용자가 무엇을 입력할지 알 수 없기 때문에 unknown
// 숫자일지 문자열일지 몰라..
// 에러 발생 없이 어떤 값이든 저장할 수 있음 any와는 다름
// unknown은 any보다 좀 더 제한적, 그래서 좋아
// 어떤 타입을 저장할지 정확히 알 수 없음
var userInput;
var userName;
userInput = 5;
userInput = 'zzbtang';
// userName = userInput; // 에러, any는 에러X
// unknown을 쓰는 경우, userInput에 저장된 타입을 확인해야함
// 추가적인 타입검사가 필요
if (typeof userInput === 'string') {
    userName = userInput;
}
// never 타입
// void와는 달리 함수가 반환할 수 있음
function generateError(message, code) {
    throw {
        message: message,
        errorCode: code
    };
}
var result = generateError('An error occured!', 500);
console.log(result);
