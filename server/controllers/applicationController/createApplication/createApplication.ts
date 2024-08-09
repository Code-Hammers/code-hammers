import { Request, Response } from 'express';
import { pool } from '../../../config/sql-db';

const createApplication = async (req: Request, res: Response) => {
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
      user_id,
    } = req.body;

    const appliedDate = new Date(date_applied).toISOString();

    const jobQuery = `
      INSERT INTO jobs (title, company, location, description, url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const jobValues = [title, company, location, description, url];
    const jobResult = await pool.query(jobQuery, jobValues);
    const job_id = jobResult.rows[0].id;

    const applicationQuery = `
      INSERT INTO applications (job_id, status_id, user_id, quick_apply, date_applied, general_notes, last_updated)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id
    `;
    const applicationValues = [job_id, status_id, user_id, quick_apply, appliedDate, general_notes];
    const applicationResult = await pool.query(applicationQuery, applicationValues);

    res.status(201).json({ id: applicationResult.rows[0].id });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default createApplication;
