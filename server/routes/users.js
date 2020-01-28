import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  getAllUsers,
} from '../controllers/users';

const router = express.Router();

router.get(
  '/',
  catchErrors(getAllUsers),
);

export default router;
