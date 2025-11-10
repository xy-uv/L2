// Primitive types in TypeScript

const string = "Hello! TypeScript heres.";
const str: string = "Hello! I am TypeScript.";

console.log(string);
console.log(str);

const num1 = 31;
const num2: number = 99;
console.log(num1, num2);

const bool1 = true;
const bool2: boolean = false;
console.log(bool1, bool2);

const nai = null;
const un = undefined;

const sym1: symbol = Symbol("description");
const sym2: symbol = Symbol("description");

console.log(sym1 === sym2); // false, symbols are unique

const bigInt1: bigint = 1n;
const bigInt2 = BigInt(2);

console.log(bigInt1 + bigInt2); // 3n
console.log(typeof bigInt1); // "bigint"
