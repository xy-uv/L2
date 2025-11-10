// Object
const person = { name: "John", age: 30 };
console.log(person); // { name: 'John', age: 30 }

// Array
const numbers: number[] = [1, 2, 3];
console.log(numbers); // [ 1, 2, 3 ]

// Function
const greet = (name: string) => console.log(`Hello, ${name}!`);
greet("MR. X"); // Hello, MR. X!

// Map
const colors = new Map<string, string>();
colors.set("red", "#FF0000");
colors.set("green", "#00FF00");
console.log(colors); // Map(2) { 'red' => '#FF0000', 'green' => '#00FF00' }

// Set
const uniqueNumbers = new Set<number>();
uniqueNumbers.add(1);
uniqueNumbers.add(2);
console.log(uniqueNumbers); // Set(2) { 1, 2 }

// Tuple (a specific type of array)
const personTuple: [string, number] = ["John", 30];
console.log(personTuple); // [ 'John', 30 ]

// Class
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const john = new Person("John", 30);
console.log(john); // Person { name: 'John', age: 30 }

// Interface (defining a type)
interface Book {
  title: string;
  author: string;
}

const book: Book = { title: "TypeScript Guide", author: "Author Name" };
console.log(book); // { title: 'TypeScript Guide', author: 'Author Name' }
