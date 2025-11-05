//! Stack
class Stack {
  constructor() {
    this.items = [];
  }

  //? O(1)
  push(value) {
    this.items.push(value);
    return this;
  }

  //? O(1)
  pop() {
    if (this.isEmpty()) return undefined;
    return this.items.pop();
  }

  //? O(1)
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  //? O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  //? O(n)
  print() {
    console.log(this.items.slice().reverse().join(" -> "));
    return this;
  }
}

const stack = new Stack();
stack.push(2).push(3).push(4);
stack.print().push(5);
console.log(stack.peek());
stack.print().pop();
stack.print();
