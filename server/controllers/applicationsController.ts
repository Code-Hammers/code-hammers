import { Request, Response } from 'express';
import { CustomRequest } from '../types/customRequest';
import { pool } from '../config/sql-db';

interface StatusCount {
  status: string;
  count: string;
}

const getAllApplications = async (req: Request, res: Response) => {
const getAllApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id;

    const query = `
      SELECT
        applications.id,
        jobs.company,
        jobs.title,
        statuses.name AS status,
        applications.general_notes,
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

    const { rows } = await pool.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getStatuses = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM statuses');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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
    const applicationValues = [
      job_id,
      status_id,
      user_id,
      quick_apply,
      date_applied,
      general_notes,
    ];
    const applicationResult = await pool.query(applicationQuery, applicationValues);

    res.status(201).json({ id: applicationResult.rows[0].id });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getApplicationById = async (req: CustomRequest<{ id: string }>, res: Response) => {
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

const updateApplication = async (req: CustomRequest<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: 'You are not authorized to update this record' });
  }

  try {
    const { job_id, status_id, user_id, quick_apply, date_applied, general_notes } = req.body;
    const query = `
      UPDATE applications
      SET job_id = $1, status_id = $2, user_id = $3, quick_apply = $4, date_applied = $5, general_notes = $6, last_updated = NOW()
      WHERE id = $7 AND user_id = $8
      RETURNING id
    `;
    const { rows } = await pool.query(query, [
      job_id,
      status_id,
      user_id,
      quick_apply,
      date_applied,
      general_notes,
      id,
      req.user.id,
    ]);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'You are not authorized to update this record or application not found' });
    }

    res.status(200).json({ message: 'Application updated successfully' });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAggregatedUserStats = async (req: CustomRequest<{ userId: string }>, res: Response) => {
  const { userId } = req.params;
  if (!req.user || req.user.id !== userId)
    return res.status(401).json({ message: 'You are not authorized to retrieve those records' });
  try {
    const applicationsByStatusQuery = `
      SELECT statuses.name AS status, COUNT(*) AS count
      FROM applications 
      JOIN statuses ON applications.status_id = statuses.id 
      WHERE applications.user_id = $1 
      GROUP BY statuses.name
    `;
    const applicationsByStatusResult = await pool.query<StatusCount>(applicationsByStatusQuery, [
      userId,
    ]);

    const totalApplications = applicationsByStatusResult.rows.reduce(
      (sum: number, row: StatusCount) => sum + parseInt(row.count, 10),
      0,
    );

    res.json({
      totalApplications,
      applicationsByStatus: applicationsByStatusResult.rows,
    });
  } catch (error) {
    console.error('Error fetching aggregated data:', error);
    res.status(500).send('Internal server error');
  }
};

const updateNotificationPeriod = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { period } = req.body;

    const query = `
      UPDATE applications
      SET notification_period = $1
      WHERE id = $2
    `;
    await pool.query(query, [period, id]);
    res.status(200).json({ message: 'Notification period updated successfully' });
  } catch (error) {
    console.error('Error updating notification period:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const pauseNotifications = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { pause } = req.body;

    const query = `
      UPDATE applications
      SET notifications_paused = $1
      WHERE id = $2
    `;
    await pool.query(query, [pause, id]);
    res.status(200).json({ message: `Notifications ${pause ? 'paused' : 'resumed'} successfully` });
  } catch (error) {
    console.error('Error pausing/resuming notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getAllApplications,
  getStatuses,
  createApplication,
  updateApplication,
  getApplicationById,
  getAggregatedUserStats,
  updateNotificationPeriod,
  pauseNotifications,
};
