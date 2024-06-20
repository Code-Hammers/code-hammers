import { Response } from 'express';
import { CustomRequest } from '../../../types/customRequest';
import { pool } from '../../../config/sql-db';

interface StatusCount {
  status: string;
  count: string;
}

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

export default getAggregatedUserStats;
