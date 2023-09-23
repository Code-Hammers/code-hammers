import express, { Response } from "express";
import {
  registerUser,
  authUser,
  getUserById,
  deleteUserByEmail,
} from "../controllers/userController";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser, (req, res: Response) => {
  return res.status(201).json(res.locals.user);
});
router.delete("/:email", deleteUserByEmail, (req, res: Response) => {
  return res.status(200).json({ msg: "User successfully deleted!" });
});
router.get("/:userId", getUserById, (req, res: Response) => {
  return res.status(200).json(res.locals.user);
});

export default router;
