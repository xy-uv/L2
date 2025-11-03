//* Sort

const numbers = [40, 100, 1, 5, 25, 10];
const fruits = ["Banana", "apple", "Cherry", "date"];

numbers.sort((a, b) => a - b);
fruits.sort((a, b) => a.localeCompare(b));

// console.log(numbers);
// console.log(fruits);

//* Nested Array Flatting

const array = [1, 2, 3, [4, 5, [6, 7, [7, 8, [8, 9, [99, 22, [11, 77]]]]]]];

const flatArray = array.flat(Infinity).sort((a, b) => a - b);

// console.log(flatArray);

const tagsFromPosts = [
  ["javascript", "react", "css"],
  ["node", "express"],
  ["css", "html", "react"],
];
const tags = [...new Set(tagsFromPosts.flat())];
console.log(tags);
