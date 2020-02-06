import express from 'express';
import { canAccess } from 'express-authorize-routes';

import catchErrors from '../utils/catch-errors';
import {
  getAllUsers,
  getCurrentUser,
} from '../controllers/users';

const router = express.Router();

router.get(
  '/',
  (req, res, next) => canAccess(req.user.grant?.role, 'user', 'read', 'any')(req, res, next),
  catchErrors(getAllUsers),
);

router.get(
  '/get-current-user',
  (req, res, next) => canAccess(req.user.grant?.role, 'user', 'read', 'own')(req, res, next),
  catchErrors(getCurrentUser),
);

export default router;
