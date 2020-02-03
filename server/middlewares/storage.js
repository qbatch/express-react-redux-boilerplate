import { createNamespace } from 'continuation-local-storage';

const namespaceName = 'request';

const ns = createNamespace(namespaceName);

export const bindCurrentNamespace = (req, res, next) => {
  ns.bindEmitter(req);
  ns.bindEmitter(res);

  ns.run(() => {
    next();
  });
}

export const setCurrentTenantId = (tenantId) => {
  return ns.set('tenantId', tenantId);
}

export const getCurrentTenantId = () => {
  return ns.get('tenantId');
}
