# interface
- 인터페이스는 객체의 구조를 설명
- 객체의 형태를 설명하는 데 사용할 수 있음
- 코드 블록 내에서 객체의 형태를 정의할 수 있음
- 클래스와 달리 인터페이스는 청사진으로 사용하는 것이 아니라 사용자 정의 타입으로 사용함
- 구체적인 값이 아닌 구조만 있을 뿐
- 객체의 타입을 확인하는 데 사용할 수 있음
- 인터페이스를 타입으로 사용할 수 있음
- 인터페이스를 타입으로 바꿔도 제대로 작동함
- 그렇다면 왜 인터페이스를 쓰는 것일까?
- 가장 큰 차이점은 인터페이스는 객체의 구조를 설명하기 위해서만 사용함
- 실제로 객체 유형을 정의할 때 인터페이스를 사용자 정의 타입보다 더 많이 사용
- 그 이유는 인터페이스를 클래스가 이행하고 준수해야 하는 약속처럼 쓸 수 있음 
- 인터페이스를 여러 클래스가 공유할 수 있음
- 클래스 하나에 여러 인터페이스를 구현할 수 있음 - 상속과의 차이점
- 인터페이스는 주로 구체적인 구현이 아닌 서로 다른 클래스 간의 기능을 공유하기 위해 사용됨
- 인터페이스 내에 구현이나 값을 입력하는 게 아닌 구조와 클래스가 가져야 할 기능을 입력해야 함.
- 인터페이스를 어떤 상수나 변수의 타입으로 사용하여 인터페이스 타입을 기반으로
하는 다른 타입의 클래스를 저장할 수 있다
- public, private 등은 지정할 수 없지만
readonly는 가능함.
- 인터페이스는 함수의 구조를 정의하는 데에도 사용할 수 있음.