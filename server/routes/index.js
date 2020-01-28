import express from 'express';

import {
  authenticateAuthToken,
} from '../middlewares/auth';

import AuthRoutes from './auth';
import UserRoutes from './users';


const router = express.Router();

router.use('/', AuthRoutes);
router.use('/users', authenticateAuthToken(), UserRoutes);

export default router;
