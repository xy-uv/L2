import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const insert = async (payload: Record<string, unknown>) => {
  const { name, email, role, password, age, phone, address } = payload;
  const hashedPassword = await bcrypt.hash(password as string, 11);
  const result = await pool.query(
    `INSERT INTO users(name,email,role,password,age,phone,address) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [name, email, role, hashedPassword, age, phone, address]
  );
  return result;
};

const read = async () => {
  return await pool.query(`SELECT * FROM users`);
};

const single = async (id: string) => {
  return await pool.query(` SELECT * FROM users WHERE id=$1 `, [id]);
};

const update = async (payload: Record<string, unknown>, id: string) => {
  const { name, email, age, phone, address } = payload;

  const result = await pool.query(
    `UPDATE users SET name=$1,email=$2,age=$3,phone=$4,address=$5 WHERE id=$6 RETURNING * `,
    [name, email, age, phone, address, id]
  );
  return result;
};

const remove = async (id: string) => {
  return await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
};
export const UserServices = { insert, read, single, update, remove };
