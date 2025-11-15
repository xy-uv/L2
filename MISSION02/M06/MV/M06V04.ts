//* Keyof constrains

type RichVehicle = {
  car: string;
  bike: string;
  bus: string;
};

const richPeopleVehicle: RichVehicle = {
  car: "Audi",
  bike: "Yemaha",
  bus: "Mercediz",
};

type MyVehicle1 = "car" | "bike" | "bus";
type MyVehicle2 = keyof RichVehicle;

const myVehicle1: MyVehicle1 = "bike";
const myVehicle2: MyVehicle2 = "car";

type TUser = {
  id: number;
  name: string;
  address: {
    city: string;
  };
};
const user: TUser = {
  id: 12369,
  name: "Shifat",
  address: {
    city: "Rangpur",
  },
};

//? const myId = user.id;
//? const myId = user["id"];
//? const myName = user["name"];
//? const address = user["address"];

//? console.log({ myId, myName, address });

const getPropertyFromObj = <X>(obj: X, key: keyof X) => {
  return obj[key];
};

const product = {
  brand: "HP",
};

const student = {
  id: 123,
  class: "four",
};

const result2 = getPropertyFromObj(product, "brand");
const result3 = getPropertyFromObj(student, "id");
