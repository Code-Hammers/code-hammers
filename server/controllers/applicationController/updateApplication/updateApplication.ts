import { Request, Response } from 'express';
import { pool } from '../../../config/sql-db';

const updateApplication = async (req: Request, res: Response) => {
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

export default updateApplication;
