import express from 'express';

import {
  authenticateAuthToken,
} from '../middlewares/auth';

import AuthRoutes from './auth';
import UserRoutes from './users';
import GrantRoutes from './grants';

const router = express.Router();

router.use('/', AuthRoutes);
router.use('/users', authenticateAuthToken(), UserRoutes);
router.use('/grants', authenticateAuthToken(), GrantRoutes);

export default router;
