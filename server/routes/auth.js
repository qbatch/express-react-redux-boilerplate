import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from '../controllers/auth';

const router = express.Router();

router.post('/register', catchErrors(registerUser));
router.post('/login', catchErrors(loginUser));
router.get('/get-current-user', catchErrors(getCurrentUser));

export default router;
