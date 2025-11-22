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
