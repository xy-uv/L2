//! Using Higher Order Function
const createCounter = () => {
  let count = 0;
  return (amount) => {
    return (count += amount);
  };
};

const counter = createCounter();
// console.log(counter(3));
// console.log(counter(5));

//! Using global variable
let count = 0;
const counterB = (amount) => {
  return (count += amount);
};

// console.log(counterB(4));
// console.log(counterB(6));

class Counter {
  constructor(count) {
    this.count = count;
  }
  add(amount) {
    this.count += amount;
    return this;
  }
  print() {
    console.log(this.count);
  }
}
const counter1 = new Counter(0);
const counter2 = new Counter(10);
counter1.add(6).add(4).print();
counter2.add(40).add(60).print();
