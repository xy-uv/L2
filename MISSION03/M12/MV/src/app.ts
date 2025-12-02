import express, { Application, Request, Response } from "express";
import cors from "cors";
import dbConnection, { pool } from "./config/db";
import router from "./routes";

const app: Application = express();

//! Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnection();

//! Calling routes
app.use("/api/v1", router);

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

app.get("/todos", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      response: "ok",
      message: "TODOS retrieve successfully!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      response: "wrong",
      message: error.message,
    });
  }
});

app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      response: "ok",
      message: "Single TODO retrieve successfully!!",
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

app.patch("/todos/:id", async (req: Request, res: Response) => {
  const { title, description, due_date } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE todos SET title=$1,description=$2,due_date=$3 WHERE id=$4 RETURNING *  
      `,
      [title, description, due_date, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        response: "wrong",
        message: "TODOS not found",
      });
    } else {
      res.status(201).json({
        success: true,
        response: "ok",
        message: "TODOS updated successfully",
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

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
    DELETE FROM todos WHERE id=$1`,
      [req.params.id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "TODOS not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "TODOS deleted successfully",
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

export default app;
