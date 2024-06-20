import { Request, Response } from 'express';
import { pool } from '../../../config/sql-db';

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

export default updateNotificationPeriod;
