const firstArray = [];
const secondArray = [];

for (let i = 1; i <= 600000; i++) {
  if (i <= 300000) {
    firstArray.push(i);
  }
  secondArray.push(i);
}
console.log("First Array: ", firstArray.length);
console.log("Second Array: ", secondArray.length);

const firstUserList = firstArray.map((number) => ({
  userId: number,
}));
const secondUserList = secondArray.map((number) => {
  return {
    userId: number,
  };
});

const st = performance.now("brutForce");
const user = secondUserList.find((user) => user.userId === 9999);
const ed = performance.now("brutForce");
console.log(ed - st, "ms");

const start = performance.now("efc");
const use = secondUserList[9999];
const end = performance.now("efc");
console.log(end - start, "ms");
