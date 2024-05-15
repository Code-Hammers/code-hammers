import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectPG = async (): Promise<void> => {
  try {
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });

    await pool.query("SELECT NOW()");
    console.log("PostgreSQL is connected");
  } catch (error: any) {
    console.error("Error connecting to PostgreSQL:", error.message);
    process.exit(1);
  }
};

export { connectPG };
