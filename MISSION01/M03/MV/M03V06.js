class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
const head = new Node(10);
//* { value: 10, next: null }
head.next = new Node(20);
//* { value: 10, next: { value: 20, next: null } }
head.next.next = new Node(30);
//* { value: 10, next: { value: 20, next: { value: 10, next: null } } }

console.log(head);

let currentNode = head;

while (currentNode !== null) {
  console.log(currentNode.value, " ");
  currentNode = currentNode.next;
}
