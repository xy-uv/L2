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

const update = async (data: any, id: string) => {
  const { name, email, age, phone, address } = data;

  const result = await pool.query(
    `UPDATE users SET name=$1,email=$2,age=$3,phone=$4,address=$5 WHERE id=$6 RETURNING * `,
    [name, email, age, phone, address, id]
  );
  return result;
};

const remove = async (id: string) => {
  return await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
};
export const UserServices = { create, read, single, update, remove };
