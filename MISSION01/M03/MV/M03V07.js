class Node {
  constructor(value) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);

    // ? If the linked list is empty
    if (this.head === null && this.length === 0) {
      this.head = node;
      this.tail = node;
    } //? If the linked list isn't empty
    else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;

    return this;
  }

  prepend(value) {
    const node = new Node(value);
    //? If the linked list is empty
    if (this.head === null && this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      //? If the list is't empty
      node.next = this.head;
      this.head = node;
    }

    this.length++;

    return this;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      console.error("Index out of bound");
      return undefined;
    }
  }

  remove() {}

  print() {
    const arr = [];

    const currentNode = this.head;
    while (currentNode !== null) {
      arr.push(currentNode);
      currentNode = currentNode.next;
    }
    console.log(arr.join(" -> "), " -> null ");
  }
}
