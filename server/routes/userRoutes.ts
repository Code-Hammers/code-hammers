import express, { Response } from "express";
import { registerUser, authUser } from "../controllers/userController";

const router = express.Router();

router.post("/login", authUser, (req, res: Response) => {
  return res.status(200).json(res.locals.user);
});
router.post("/register", registerUser, (req, res: Response) => {
  return res.status(200).json({ msg: "Successful register!" });
});

export default router;
