type GenericArray<T> = T[];

// const friends:string[]=['X','Y','Z']
// const friends: Array<string> = ["X", "Y", "Z"];
const friends: GenericArray<string> = ["X", "Y", "Z"];

// const rolls: number[] = [1, 3, 8, 9, 5, 6, 7];
// const rolls: Array<number> = [1, 3, 8, 9, 5, 6, 7];
const rolls: GenericArray<number> = [1, 3, 8, 9, 5, 6, 7];

// const is: boolean[] = [true, false, true];
// const is: Array<boolean> = [true, false, true];
const is: GenericArray<boolean> = [true, false, true];

type TUser = {
  id: number;
  name: string;
  salary: number;
};

/*
const users: TUser[] = [
  { id: 1984, name: "X", salary: 499999 },
  { id: 1985, name: "Y", salary: 999999 },
];
*/
/*
const user: Array<TUser> = [
  { id: 1984, name: "X", salary: 499999 },
  { id: 1985, name: "Y", salary: 999999 },
];
*/

const user: GenericArray<TUser> = [
  { id: 1984, name: "X", salary: 499999 },
  { id: 1985, name: "Y", salary: 999999 },
];
