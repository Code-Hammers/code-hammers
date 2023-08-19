import express, {Response} from 'express';
import { registerUser, authUser } from '../controllers/userController';


const router = express.Router();

router.post('/login', authUser, (res: Response) => {
    return res.status(200).json({msg: "Successful login!"})
});
router.post('/', registerUser, (res: Response) => {
    return res.status(200).json({msg: "Successful register!"})
});

export default router;
