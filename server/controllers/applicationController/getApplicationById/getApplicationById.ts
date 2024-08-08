import { Request, Response } from 'express';
import { pool } from '../../../config/sql-db';

const getApplicationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `
        SELECT
          applications.id,
          jobs.title,
          jobs.company,
          jobs.location,
          jobs.description,
          jobs.url,
          statuses.id AS status_id,
          statuses.name AS status,
          applications.quick_apply,
          applications.date_applied,
          applications.general_notes,
          applications.job_id,
          applications.user_id
        FROM
          applications
          INNER JOIN jobs ON applications.job_id = jobs.id
          INNER JOIN statuses ON applications.status_id = statuses.id
        WHERE
          applications.id = $1
      `;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (!req.user || req.user.id !== rows[0].user_id)
      return res.status(401).json({ message: 'You are not authorized to retrieve those records' });

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching application by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getApplicationById;
