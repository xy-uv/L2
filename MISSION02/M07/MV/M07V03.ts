// * Type Guard
//? typeof type guard

type AlphaNumeric = string | number;

const add = (num1: AlphaNumeric, num2: AlphaNumeric) => {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else {
    return num1.toString() + num2.toString();
  }
};

add(2, 2); //? 4

add(2, "2"); //? 22

add("2", 2); //? 22

add("2", "2"); //? 22

type TNormalUser = {
  name: string;
};
type TAdminUser = TNormalUser & { role: "Admin" };

interface INormalUser {
  name: string;
}
interface IAdminUser extends INormalUser {
  role: "Admin";
}

const getUserInfo = (user: INormalUser | IAdminUser) => {
  if ("role" in user) {
    console.log(`${user.name} and his role is : ${user.role}`);
  } else {
    console.log(` ${user.name}`);
  }
};
getUserInfo({ name: "Normal", role: "Admin" });
