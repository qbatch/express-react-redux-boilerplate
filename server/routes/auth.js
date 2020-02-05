import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  logoutUser,
} from '../controllers/auth';
import {
  authenticateAuthToken,
} from '../middlewares/auth';

const router = express.Router();

router.post('/register', catchErrors(registerUser));
router.post('/login', catchErrors(loginUser));
router.delete('/logout', authenticateAuthToken(), catchErrors(logoutUser));
router.post('/forgot-password', catchErrors(forgotPassword));
router.post('/update-password', catchErrors(updatePassword));

export default router;
