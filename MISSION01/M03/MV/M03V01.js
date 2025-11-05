//* Stateful vs Stateless

//! Stateless the function
const counter = (amount) => {
  let count = 0;
  return (count += amount);
};

console.log(counter(2));
console.log(counter(3));

//!Stateful the object
const counterS = {
  count: 0,
  add(amount) {
    this.count += amount;
    return this;
  },
  print() {
    return this.count;
  },
};

//! Stateful the object-> but stateless
const counterX = {
  add(amount) {
    let count = 0;
    return (count += amount);
  },
};

console.log(counterX.add(6));
console.log(counterX.add(7));

console.log(counterS.add(5).print());
console.log(counterS.add(9).print());
