import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// const connectPG = async (): Promise<void> => {
//   try {
//     const pool = new Pool({
//       user: process.env.PGUSER,
//       host: process.env.PGHOST,
//       database: process.env.PGDATABASE,
//       password: process.env.PGPASSWORD,
//       port: Number(process.env.PGPORT),
//     });

//     await pool.query("SELECT NOW()");
//     console.log("PostgreSQL is connected");
//   } catch (error: any) {
//     console.error("Error connecting to PostgreSQL:", error.message);
//     process.exit(1);
//   }
// };

// export { connectPG };

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  //host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  //port: Number(process.env.POSTGRES_PORT),
});

export { pool };
