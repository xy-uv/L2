import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const variables = {
  connection_string: process.env.NEON_PSQL_CONNECTION_STRING ?? "",
  port: Number(process.env.PORT) ?? 5050,
  jwt_secret: process.env.JWT_SECRET ?? "",
  jwt_expire: process.env.JWT_EXPIRATION ?? "3d",
} as const;
