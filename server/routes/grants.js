import express from 'express';
import { canAccess } from 'express-authorize-routes';

import catchErrors from '../utils/catch-errors';
import {
  getGrants,
  createGrant,
  deleteGrant,
  addPermissionToRole,
  deletePermissionFromRole,
  updatePermissionInRole,
} from '../controllers/grants';

const router = express.Router();

router.get(
  '/',
  (req, res, next) => canAccess(req.user.grant?.role, 'grant', 'read', 'any')(req, res, next),
  catchErrors(getGrants),
);
router.post(
  '/',
  (req, res, next) => canAccess(req.user.grant?.role, 'grant', 'create', 'any')(req, res, next),
  catchErrors(createGrant),
);
router.post(
  '/:role/permissions',
  (req, res, next) => canAccess(req.user.grant?.role, 'grant', 'create', 'any')(req, res, next),
  catchErrors(addPermissionToRole),
);
router.put(
  '/:role/permissions/:permissionId',
  (req, res, next) => canAccess(req.user.grant?.role, 'grant', 'update', 'any')(req, res, next),
  catchErrors(updatePermissionInRole),
);
router.delete(
  '/:role/permissions/:permissionId',
  (req, res, next) => canAccess(req.user.grant?.role, 'grant', 'delete', 'any')(req, res, next),
  catchErrors(deletePermissionFromRole),
);
router.delete(
  '/:id',
  (req, res, next) => canAccess(req.user.grant?.role, 'grant', 'delete', 'any')(req, res, next),
  catchErrors(deleteGrant),
);

export default router;
