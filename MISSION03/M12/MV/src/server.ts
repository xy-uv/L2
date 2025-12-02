import express, { Application, Request, Response } from "express";
import cors from "cors";
import { variables } from "./config";
import { Pool } from "pg";

const app: Application = express();

//! Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = new Pool({ connectionString: variables.connection_string });

(async () => {
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
})();

//! USERS CRUD
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, age, phone, address } = req.body;
  try {
    const result = await pool.query(
      `
    INSERT INTO users(name,email,age,phone,address) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
      [name, email, age, phone, address]
    );
    res.status(201).json({
      success: true,
      response: "ok",
      message: "Data inserted successfully!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
});

app.get("/users", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
    SELECT * FROM users
    `);
    res.status(200).json({
      success: true,
      response: "ok",
      message: "Users retrieve successfully!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id=$1
      `,
      [req.params.id]
    );
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        response: "ok",
        message: "Data retrieve successfully!!",
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        response: "wrong",
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  const { name, email, age, phone, address } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE users SET name=$1,email=$2,age=$3,phone=$4,address=$5 WHERE id=$6 RETURNING *  
      `,
      [name, email, age, phone, address, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        response: "wrong",
        message: "User not found",
      });
    } else {
      res.status(201).json({
        success: true,
        response: "ok",
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1`,
      [req.params.id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error?.message,
    });
  }
});

//! TODOS
app.post("/todos", async (req: Request, res: Response) => {
  const { uid, title, description, due_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(uid,title,description,due_date) VALUES($1,$2,$3,$4) RETURNING *`,
      [uid, title, description, due_date]
    );
    res.status(201).json({
      success: true,
      response: "ok",
      message: "Data inserted successfully!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error.message,
    });
  }
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
  } catch (error) {}
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    response: "ok",
    message: "Server is Running for SERVE!!",
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    response: "ok",
    message: "Server health is Great!!",
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    response: "wrong",
    message: "Requested URL not found!!",
    url: req.path,
  });
});

app.listen(variables.port, () => {
  console.log(`Server is listening on port ${variables.port}`);
});
