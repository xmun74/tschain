class Human {
  public name: string; //name이란 이름의 public속성 선언
  public age: number; //public말고 private하면 Human내부에서만 접근가능함. person.age 컴파일안됨
  public gender: string;
  constructor(name: string, age: number, gender?: string) {
    //생성자 :class로부터 객체만들때마다 호출되는 메소드
    this.name = name; //class의 name은 = 생성자의 name과 같다고 정의
    this.age = age;
    this.gender = gender;
  }
}

const lynn = new Human("Lynn", 18, "female");

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}~!`;
};

console.log(sayHi(lynn));

export {};
