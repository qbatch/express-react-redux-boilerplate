import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  getAllUsers,
  getCurrentUser,
} from '../controllers/users';
import { canAccess } from '../middlewares/grants';

const router = express.Router();

router.get(
  '/',
  canAccess('User', 'read', 'any'),
  catchErrors(getAllUsers),
);

router.get(
  '/get-current-user',
  canAccess('user', 'read', 'own'),
  catchErrors(getCurrentUser),
);

export default router;
