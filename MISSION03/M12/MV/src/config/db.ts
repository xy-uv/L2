import { Pool } from "pg";
import { variables } from ".";

export const pool = new Pool({ connectionString: variables.connection_string });

const dbConnection = async () => {
  //* CREATING USER TABLE
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(55) NOT NULL,
        email VARCHAR(85) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15) UNIQUE,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )  
        `);
  //* CREATING TODOS TABLE
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    uid INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(155) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    due_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
};

export default dbConnection;
