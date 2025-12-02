import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import { jwts } from "../../utils/jwts";
import { variables } from "../../config";

const login = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error("User not found!");
  }
  const user = result.rows[0];
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Wrong Password!");
  }
  const token = jwts.createToken(
    { uid: user.id, email: user.email, role: user.role },
    variables.jwt_secret,
    variables.jwt_expire
  );
  console.log(token);
  return { token, user };
};

export const AuthServices = { login };
