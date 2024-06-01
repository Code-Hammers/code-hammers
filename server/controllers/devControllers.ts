import { Request, Response, NextFunction } from 'express';
import { seedDatabase } from '../../dev-tools/scripts/alumniDatabaseSeeder';

const seedRegistrationDatabase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await seedDatabase();
    res.status(200).send('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database.');
  }
};

export { seedRegistrationDatabase };
