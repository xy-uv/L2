import { pool } from "../../config/db";

const create = async (data: any) => {
  const { name, email, age, phone, address } = data;

  const result = await pool.query(
    `INSERT INTO users(name,email,age,phone,address) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, age, phone, address]
  );
  return result;
};

const read = async () => {
  return await pool.query(`SELECT * FROM users`);
};

const single = async (id: string) => {
  return await pool.query(` SELECT * FROM users WHERE id=$1 `, [id]);
};

export const UserServices = { create, read, single };
