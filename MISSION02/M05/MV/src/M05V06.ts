// Object, Literal & Optional type in Object
type User = {
  id: string;
  name: {
    firstName: string;
    middleName?: string; //Optional type
    lastName: string;
  };
  organization: "Declives Corporation Ltd."; //Literal type
  designation: "Employee" | "Manager" | "CEO";
};

const user: User = {
  id: "0x9397",
  name: {
    firstName: "MR",
    middleName: ".",
    lastName: "X",
  },
  organization: "Declives Corporation Ltd.",
  designation: "Employee",
};

const user2: User = {
  id: "0x9489",
  name: {
    firstName: "MR",
    lastName: "Y",
  },
  organization: "Declives Corporation Ltd.",
  designation: "Manager",
};

console.log(user, user2);
