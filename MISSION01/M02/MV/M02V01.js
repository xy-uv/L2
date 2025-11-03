const obj = {};

const course1 = { courseId: "Level1" };
const course2 = { courseId: "Level2" };

obj[course1] = { name: "Programming Hero Level1" };
obj[course2] = { name: "Next Level web development" };

// console.log(obj);

const map = new Map();

map.set(course1, { name: "Programming Hero Level1" });
map.set(course2, { name: "Next Level web development" });

// map.forEach((value, key) => console.log(`Key=${key} and Value=${value}`));

for (let key of map.keys()) {
  console.log(key);
}

console.log(map);
