import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/db/users.json");

export function readUser() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function writeUser(user: any) {
  fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
}
