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

const getStatuses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await pool.query("SELECT * FROM statuses");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching statuses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      company,
      location,
      description,
      url,
      status_id,
      quick_apply,
      date_applied,
      general_notes,
    } = req.body;

    const jobQuery = `
      INSERT INTO jobs (title, company, location, description, url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const jobValues = [title, company, location, description, url];
    const jobResult = await pool.query(jobQuery, jobValues);
    const job_id = jobResult.rows[0].id;

    const applicationQuery = `
      INSERT INTO applications (job_id, status_id, quick_apply, date_applied, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const applicationValues = [
      job_id,
      status_id,
      quick_apply,
      date_applied,
      general_notes,
    ];
    const applicationResult = await pool.query(
      applicationQuery,
      applicationValues
    );

    res.status(201).json({ id: applicationResult.rows[0].id });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllApplications, getStatuses, createApplication };
