import { Request, Response } from 'express';
import { pool } from '../../../config/sql-db';

interface StatusCount {
  status: string;
  count: string;
}

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

export default pauseNotifications;
