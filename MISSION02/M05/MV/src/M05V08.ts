// Spread Operator

const friends = ["Fahim", "Karim"];
const schoolFriends = ["Rahim", "Sahim"];
const clgFriends = ["Naima", "Saima"];
const bestFriends = [...friends, ...schoolFriends, ...clgFriends];

console.log(bestFriends);

const user = { name: "Mr.X", age: 20 };
const otherInfo = { hobby: "X", passion: "Coding" };
const userInfo = { ...user, ...otherInfo };

console.log(userInfo);

const sendInvite = (...gfs: string[]) => {
  gfs.forEach((fr) => console.log(`Sending invite to ${fr}`));
};

sendInvite("SALMA", "JIM", "NIMA", "BONNA", "ROHANY", "KPN");
