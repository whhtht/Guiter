import { Router } from 'express';
import { signUpHandler, signInHandler } from '../controllers/auth';

const router = Router();

router.post('/signup', signUpHandler);
router.post('/signin', signInHandler);

export { router as signUp, router as signIn };
