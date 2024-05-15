// import express from "express";
// import { Request, Response, NextFunction } from "express";
// import { pool } from "../config/sql-db";

// const router = express.Router();

// router.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log(pool);
//     const result = await pool.query("SELECT NOW()");
//     res.json({ message: "PostgreSQL is connected", result: result.rows });
//   } catch (error) {
//     console.error("Error connecting to PostgreSQL:", error);
//     next(error);
//   }
// });

// export default router;
