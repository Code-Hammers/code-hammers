import Alumni from "../models/alumniModel";
import { Request, Response, NextFunction } from "express";
import { IAlumni } from "../types/alumni";

const getAllAlumniData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const alumni: IAlumni[] = await Alumni.find({});
    return res.status(200).json(alumni);
  } catch (error) {
    console.log("Awesome error handling");
  }
};

export { getAllAlumniData };
