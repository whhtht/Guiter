import { Router } from 'express';
import { signUpHandler, signInHandler } from '../controllers/authController';

const router = Router();

router.post('/signup', signUpHandler);
router.post('/', signInHandler);

export default router;
