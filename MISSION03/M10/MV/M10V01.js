const fs = require("fs");

//! Writing File
//* Create file using WriteFileSync-> Synchronously
const contentForSync =
  "This is a large content\nWe are exploring nodejs file system fs module";

try {
  fs.writeFileSync("./MISSION03/M10/OUT/write-sync.txt", contentForSync);
  console.log("File created by Synchronously!!");
} catch (error) {
  console.error("ERROR Happened: ", error.message);
}

//* Create file by WriteFile-> Asynchronously
const contentForAsync =
  "This is a large content for\nAsynchronous task exploring";

fs.writeFile("./MISSION03/M10/OUT/write-async.txt", contentForAsync, (err) => {
  if (err) {
    console.error("ERROR Happened: ", err.message);
  } else {
    console.log("File created successfully by Asynchronous!!");
  }
});

//! Reading File
//* Reading file Using readFileSync-> Synchronously
console.log("-".repeat(67));
console.log("Start Reading...........\n");
try {
  const data = fs.readFileSync("./MISSION03/M10/DATA/dairy.txt", "utf-8");
  console.log("File content by Sync: ", data);
} catch (error) {
  console.error("ERROR Happened: ", error.message);
}
console.log("\nReading Finished..........");
console.log("-".repeat(67));

//* Reading file using readFile-> Asynchronously
console.log("-".repeat(67));
console.log("Start Reading...........\n");

fs.readFile("./MISSION03/M10/DATA/dairy.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("ERROR Happened: ", err.message);
  } else {
    console.log("File Content by Async: ", data);
  }
});
console.log("\nReading Finished..........");
console.log("-".repeat(67));

//! Reading JSON File
//* Synchronously
try {
  const JSONData = fs.readFileSync("./MISSION03/M10/DATA/user.json", "utf-8");
  const data = JSON.parse(JSONData);
  console.log(data);
} catch (error) {
  console.error("ERROR Happened: ", error.message);
}

//* Asynchronously
fs.readFile("./MISSION03/M10/DATA/user.json", "utf-8", (err, data) => {
  if (err) {
    console.error("ERROR Happened: ", err.message);
  } else {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  }
});
