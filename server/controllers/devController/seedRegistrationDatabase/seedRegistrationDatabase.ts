import { Request, Response } from 'express';
import { seedDatabase } from '../../../../dev-tools/scripts/alumniDatabaseSeeder';

const seedRegistrationDatabase = async (_req: Request, res: Response) => {
  try {
    await seedDatabase();
    res.status(200).send('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database.');
  }
};

export default seedRegistrationDatabase;
