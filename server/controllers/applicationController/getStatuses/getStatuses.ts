import { Request, Response } from 'express';
import { pool } from '../../../config/sql-db';

const getStatuses = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM statuses');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching statuses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getStatuses;
