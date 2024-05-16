import { Request, Response, NextFunction } from "express";
import { pool } from "../config/sql-db";

const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = `
      SELECT
        applications.id,
        jobs.company,
        jobs.title,
        statuses.name AS status,
        applications.notes
      FROM
        applications
        INNER JOIN jobs ON applications.job_id = jobs.id
        INNER JOIN statuses ON applications.status_id = statuses.id
    `;

    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllApplications };
