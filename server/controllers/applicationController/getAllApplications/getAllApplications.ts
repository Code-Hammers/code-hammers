import { Request, Response } from 'express';
import { pool } from '../../../config/sql-db';

const getAllApplications = async (req: Request, res: Response) => {
  try {
    const { userId, status, date } = req.query;

    let query = `
        SELECT
          applications.id,
          jobs.company,
          jobs.title,
          statuses.name AS status,
          applications.general_notes,
          applications.date_applied,
          applications.last_updated,
          applications.notification_period,
          applications.notifications_paused
        FROM
          applications
          INNER JOIN jobs ON applications.job_id = jobs.id
          INNER JOIN statuses ON applications.status_id = statuses.id
        WHERE
          applications.user_id = $1
      `;

    const queryParams = [userId];
    let paramIndex = 2;

    if (status) {
      query += ` AND statuses.name != $${paramIndex}`;
      queryParams.push(status);
      paramIndex += 1;
    }

    if (date) {
      query += ` AND applications.date_applied >= $${paramIndex}`;
      queryParams.push(date);
    }

    const { rows } = await pool.query(query, queryParams);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getAllApplications;
