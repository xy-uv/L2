const numbers = [4, 6, 8, 14, 25];

const has = numbers.some((num) => num % 2 === 0);
// console.log(has);

const userRole = ["user", "editor", "MD"];
const requiredRole = ["admin", "manager", "MD", "CEO"];

const hasAccess = userRole.some((role) => requiredRole.includes(role));
// console.log(hasAccess);

const range = (start, stop, step) => {
  return Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => {
    return start + i * step;
  });
};
console.log(range(0, 10, 1));

// const range = (start, stop, step) =>
//   Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => {
//     return start + i * step;
//   });

// console.log(range(0, 10, 1));
