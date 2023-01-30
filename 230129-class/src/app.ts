// 정적 속성
// 추상 메소드가 하나라도 있으면
// 클래스도 abstract 입력해야..
abstract class Department {
  static fiscalYear = 2023;

  // 자식 클래스에서 쓸 수 있도록..
  protected employees: string[] = [];
  // private  readonly id: string;
  // private name: string;
  // constructor(id: string, n: string) {
  //   this.name = n;
  //   this.id = id;
  // }

  // 위의 코드를 줄이면 이렇게 한 줄로...
  constructor(protected readonly id: string, public name: string) {}

  // 정적 메소드
  // 클래스를 인스턴스화 하지 않고 바로 접근
  // 정적 멤버는 this로 접근 불가
  // this는 클래스를 기반으로 생성된 인스턴스를 참조하기 때문
  // 정적 멤버는 인스턴스에서 유효하지 않음
  // 정적 멤버의 전체적인 개념은 인스턴스와 분리되어 있음
  // 클래스 내에서 정적 멤버를 사용하고자 한다면 클래스 이름을 사용해야함
  static createEmployee(name: string) {
    return { name: name };
  }

  // 추상 메소드
  // 메소드의 형태와 구조가 어떤 것인지를 정의만 함
  // 추상 메소드는 모든 자식 클래스에서 구현이 되어야함
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 자식 클래스는 부모 클래스의 생성자를 포함하여
// 부모 클래스가 가진 모든 것을 자동으로 가져오게 됨
// const accounting = new ITDepartment('D1', 'Accounting) 가능..
// 고유 생성자를 추가할 수도 있음
// 자식 클래스의 생성자는 super 함수를 호출해야함
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, name: string, admins: string[]) {
    // 기본 클래스로 전달
    // 자식 클래스의 생성자에서 this에 접근하기 전에
    // 먼저 super를 호출해야함
    super(id, name);
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  // 클래스 내에서만 접근이 가능한 클래스 자체 정적 속성
  private static instance: AccountingDepartment;
  // 게터와 세터는 로직을 캡슐화하고 속성을 읽거나 설정하려 할 때
  // 실행되어야 하는 추가적인 로직을 추가하는 데 유용.

  // 게터
  // 꼭 무언가를 반환해야함
  // 꼭 속성으로 접근해야함
  // 함수처럼 괄호쌍 () -> X
  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;
    throw new Error('No report found');
  }

  // 세터
  // 이것도 실행하는 것이 아니라 값처럼 접근해야함
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    // 클래스 내에 있으므로 this를 입력해야만
    // 클래스와 클래스 메소드를 참조할 수 있음
    this.addReport(value);
  }

  // 싱글톤 패턴 - 생성자 앞에 private 키워드
  // 특정 클래스의 인스턴스가 오직 하나

  private constructor(id: string, name: string, private reports: string[]) {
    super(id, name);
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('D1', 'Accounting', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  // method overriding
  addEmployee(name: string): void {
    if (name === 'zzbtang') return;
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReport() {
    console.log(this.reports);
  }
}

// new 키워드 없이 직접 클래스에서 호출
const employee1 = Department.createEmployee('qwer');
console.log(employee1);
console.log(Department.fiscalYear);

// const accounting = new AccountingDepartment('D1', 'Accounting', []);
const accounting = AccountingDepartment.getInstance();
const it = new ITDepartment('D2', 'IT', ['zzbtang']);

accounting.describe();
it.describe();

accounting.addEmployee('zzbtang');
accounting.addEmployee('tang');
it.addEmployee('zzb');

// accounting.printEmployeeInformation();
// it.printEmployeeInformation();

// console.log(accounting.mostRecentReport);

accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
// accounting.printReport();
console.log(accounting.mostRecentReport);

console.log(accounting);
console.log(it);

/* 외부에서 접근해서 변경이 가능하다는 문제점
클래스를 사용하는 방법은 한 가지로 정하고
다른 방법은 사용하지 않도록 해야..
클래스 외부에서 employees에 접근하는 것을 허용해서는 안 됨
accounting.employees[2] = 'zzbtang';
*/

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// console.log(accountingCopy);

// accountingCopy.describe();
