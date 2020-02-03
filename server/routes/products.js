import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  getAllProducts,
  createProduct,
} from '../controllers/products';

const router = express.Router();

router.get('/', catchErrors(getAllProducts));
router.post('/', catchErrors(createProduct));

export default router;
