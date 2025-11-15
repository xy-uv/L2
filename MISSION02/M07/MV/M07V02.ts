// ----- Types -------------------------------------------------
interface Address {
  village: string;
  city: string;
  postal: number;
}

// ----- Base class --------------------------------------------
class Person {
  name: string;
  age: number;
  address: Address;

  constructor(name: string, age: number, address: Address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  getSleep(noOfHr: number) {
    console.log(`${this.name} getting sleep for ${noOfHr} hr(s)`);
    return this; // enables method chaining
  }

  getAddress() {
    console.log(
      `${this.name}'s address → village: ${this.address.village}, ` +
        `city: ${this.address.city}, postal: ${this.address.postal}`
    );
    return this;
  }
}

// ----- Student ------------------------------------------------
class Student extends Person {
  studentId: string;
  rollNo: string;

  constructor(
    name: string,
    age: number,
    address: Address,
    studentId: string,
    rollNo: string
  ) {
    super(name, age, address);
    this.studentId = studentId;
    this.rollNo = rollNo;
  }

  attendClass(noOfClass: number) {
    console.log(
      `Roll No:${this.rollNo} (${this.name}) attending ${noOfClass} class(es)`
    );
    return this;
  }

  takeExam(noOfSubject: number) {
    console.log(
      `Student ID:${this.studentId} ${this.name} taking exam for ${noOfSubject} subject(s)`
    );
    return this;
  }
}

// ----- Teacher ------------------------------------------------
class Teacher extends Person {
  teacherId: string;

  constructor(name: string, age: number, address: Address, teacherId: string) {
    super(name, age, address);
    this.teacherId = teacherId;
  }

  takeClass(noOfStudents: number) {
    console.log(
      `Teacher ID:${this.teacherId} ${this.name} is teaching ${noOfStudents} student(s)`
    );
    return this;
  }
}

// ----- Usage --------------------------------------------------
const homeAddress: Address = {
  village: "Dorijamalpur",
  city: "Sadullapur",
  postal: 5670,
};

const person1 = new Person("Himat", 11, homeAddress);
person1.getSleep(8).getAddress();

const student1 = new Student("Ayesha", 12, homeAddress, "S123", "R45");
student1.attendClass(3).takeExam(5).getSleep(7).getAddress();

const teacher1 = new Teacher("Mr. Karim", 38, homeAddress, "T789");
teacher1.takeClass(25).getSleep(6).getAddress();
