import express from 'express';
import { handleLogin, handleSignup } from '../controllers/user.js';

const router = express.Router();

router.post('/', handleSignup);
router.post('/login', handleLogin);

export default router;