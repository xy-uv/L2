const generateArrayData = (size) => {
  const itemPool = [
    "Apple",
    "Mango",
    "Banana",
    "Orange",
    "Grape",
    "Strawberry",
    "Pineapple",
    "Watermelon",
    "Cherry",
    "Blueberry",
    "Apple",
    "Orange",
    "Guava",
    "Lemon",
    "Tomato",
    "Papaya",
    "Mango",
  ];

  const generatedData = [];

  for (let i = 0; i < size; i++) {
    const randomIdx = Math.floor(Math.random() * itemPool.length);
    generatedData.push(itemPool[randomIdx]);
  }

  return generatedData;
};

const hugeData = generateArrayData(99000000);

const st1 = performance.now("brut");
const removeDuplicateByArray = (arr) => {
  const newArray = [];
  arr.forEach((el) => {
    if (!newArray.includes(el)) {
      newArray.push(el);
    }
  });
  return newArray;
};
console.log(removeDuplicateByArray(hugeData));
const ed1 = performance.now("brut");

console.log(`Array remove by Brut Force way took: ${ed1 - st1}ms`);

const st2 = performance.now("efc");
// console.log([...new Set(hugeData)]);
const removeDuplicateBySet = (arr) => {
  const set = new Set(arr);
  return Array.from(set);
};
console.log(removeDuplicateBySet(hugeData));
const ed2 = performance.now("efc");
console.log(`Array remove by efficient way using set took: ${ed2 - st2}ms`);
