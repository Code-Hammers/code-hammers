import { Request, Response, NextFunction } from "express";
import axios from "axios";

const getAlumniData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("HIT!");
  res.json({ message: "HIT!" });
};

export { getAlumniData };
