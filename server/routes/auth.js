import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  forgotPassword,
  updatePassword,
} from '../controllers/auth';

const router = express.Router();

router.post('/register', catchErrors(registerUser));
router.post('/login', catchErrors(loginUser));
router.get('/get-current-user', catchErrors(getCurrentUser));
router.post('/forgot-password', catchErrors(forgotPassword));
router.post('/update-password', catchErrors(updatePassword));

export default router;
