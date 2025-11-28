import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const variable = {
  env: process.env.NODE_ENV || "",
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
} as const;
export default variable;
