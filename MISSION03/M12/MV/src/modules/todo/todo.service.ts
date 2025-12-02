import { pool } from "../../config/db";

const insert = async (payload: Record<string, unknown>) => {
  const { uid, title, description, due_date } = payload;
  const result = await pool.query(
    `INSERT INTO todos(uid,title,description,due_date) VALUES($1,$2,$3,$4) RETURNING *`,
    [uid, title, description, due_date]
  );
  return result;
};

const retrieves = async () => await pool.query(`SELECT * FROM todos`);

const retrieve = async (id: string) =>
  await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);

const modify = async (payload: Record<string, unknown>, id: string) => {
  const { title, description, due_date } = payload;
  const result = await pool.query(
    `UPDATE todos SET title=$1,description=$2,due_date=$3 WHERE id=$4 RETURNING *`,
    [title, description, due_date, id]
  );
  return result;
};

const destroy = async (id: string) =>
  await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);

export const TodoServices = { insert, retrieves, retrieve, modify, destroy };
