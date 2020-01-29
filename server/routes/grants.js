import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  getGrants,
  createGrant,
  deleteGrant,
} from '../controllers/grants';

const router = express.Router();

router.get('/', catchErrors(getGrants));
router.post('/', catchErrors(createGrant));
router.delete('/:id', catchErrors(deleteGrant));

export default router;
