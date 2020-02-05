import express from 'express';

import catchErrors from '../utils/catch-errors';
import {
  getGrants,
  createGrant,
  deleteGrant,
  addPermissionToRole,
  deletePermissionFromRole,
  updatePermissionInRole,
} from '../controllers/grants';
import { canAccess } from '../middlewares/grants';

const router = express.Router();

router.get(
  '/',
  canAccess('grant', 'read', 'any'),
  catchErrors(getGrants),
);
router.post(
  '/',
  canAccess('grant', 'create', 'any'),
  catchErrors(createGrant),
);
router.post(
  '/:role/permissions',
  canAccess('grant', 'create', 'any'),
  catchErrors(addPermissionToRole),
);
router.put(
  '/:role/permissions/:permissionId',
  canAccess('grant', 'update', 'any'),
  catchErrors(updatePermissionInRole),
);
router.delete(
  '/:role/permissions/:permissionId',
  canAccess('grant', 'delete', 'any'),
  catchErrors(deletePermissionFromRole),
);
router.delete(
  '/:id',
  canAccess('grant', 'delete', 'any'),
  catchErrors(deleteGrant),
);

export default router;
