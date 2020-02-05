import express from 'express';

import {
  authenticateAuthToken,
} from '../middlewares/auth';

import AuthRoutes from './auth';
import UserRoutes from './users';
import GrantRoutes from './grants';
import ProductRoutes from './products';

const router = express.Router();

router.use('/', AuthRoutes);
router.use('/users', authenticateAuthToken(), UserRoutes);
router.use('/grants', authenticateAuthToken(), GrantRoutes);
router.use('/products', authenticateAuthToken(), ProductRoutes);

export default router;
