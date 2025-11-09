class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
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
    //? If inserting on first of Linked List
    if (index === 0) {
      return this.prepend(value);
    }
    //? If inserting on last of linked list
    if (index === this.length) {
      return this.append(value);
    }

    const leadingNode = this._traverseToIndex(index - 1);
    const holdingNode = leadingNode.next;

    const node = new Node(value);

    leadingNode.next = node;
    node.next = holdingNode;

    this.length++;

    return this;
  }

  remove(index) {
    if (index === 0) {
      const removedItem = this.head.value;
      this.head = this.head.next;

      if (this.length === 1) {
        this.tail = null;
      }

      this.length--;
      return removedItem;
    }

    const leadingNode = this._traverseToIndex(index - 1);
    const nodeToRemove = leadingNode.next;

    leadingNode.next = nodeToRemove.next;

    if (leadingNode.next === null) {
      this.tail = leadingNode;
    }

    this.length--;
    return this;
  }

  _traverseToIndex(index) {
    let count = 0;
    let currentNode = this.head;

    while (count !== index) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }

  print() {
    const arr = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(arr.join(" -> "), "-> null ");
  }
}

const linkedList = new LinkedList()
  .append("C")
  .prepend("A")
  .insert(1, "B")
  .print();
