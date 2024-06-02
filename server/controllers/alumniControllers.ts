import Alumni from '../models/alumniModel';
import { Request, Response } from 'express';
import { IAlumni } from '../types/alumni';

interface SearchQuery {
  name?: { $regex: string; $options: string };
  company?: { $regex: string; $options: string };
}

const getAllAlumniData = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const nameSearch = (req.query.name as string) || '';
  const companySearch = (req.query.company as string) || '';

  try {
    const searchQuery: SearchQuery = {};
    if (nameSearch) {
      searchQuery.name = { $regex: nameSearch, $options: 'i' };
    }
    if (companySearch) {
      searchQuery.company = { $regex: companySearch, $options: 'i' };
    }

    const alumni: IAlumni[] = await Alumni.find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Alumni.countDocuments(searchQuery);
    return res.status(200).json({
      alumni,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log('Awesome error handling');
  }
};

export { getAllAlumniData };
