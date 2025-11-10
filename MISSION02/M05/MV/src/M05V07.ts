// Function in TS

type AddTwoNum = (num1: number, num2: number) => number;

const printSomething = (): void => {
  console.log("Hello! something");
};
function print(): void {
  console.log("Nothing");
}

function add(num1: number, num2: number): number {
  return num1 + num2;
}
const addTwoNumber: AddTwoNum = (num1, num2) => {
  return num1 + num2;
};
