//! Queue

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
    return this;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) return undefined;

    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    console.log("Start ->", this.items.join(" -> "), "-> End");
    return this;
  }
}

const queue = new Queue().enqueue(3).enqueue(7).enqueue(4);
queue.print();
console.log(queue.dequeue());
queue.print();
console.log(queue.peek());
queue.print();
