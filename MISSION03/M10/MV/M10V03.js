const fs = require("fs");

//! Deleting file with Nodejs File System
//* Synchronously
fs.writeFileSync("./MISSION03/M10/OUT/temp.txt", "this is a temp file");
console.log("temp file created");

if (fs.existsSync("./MISSION03/M10/OUT/temp.txt")) {
  console.log("file exits!!!");

  fs.unlinkSync("./MISSION03/M10/OUT/temp.txt");
  console.log("file deleted");
}

try {
  fs.unlinkSync("./MISSION03/M10/OUT/temp.txt");
} catch (error) {
  console.log("ERROR :", error.message);
}

//* Asynchronously
fs.writeFile("./MISSION03/M10/OUT/temp2.txt", "Another temp file", (err) => {
  if (err) return console.error(err.message);

  console.log("Another temp file created");

  fs.unlink("./MISSION03/M10/OUT/temp2.txt", (err) => {
    if (err) {
      console.error("Error :", err.message);
    } else {
      console.log("Temp file 2 deleted");
    }
  });
});
