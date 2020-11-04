import { ForbiddenExceptions } from '../common/helpers/exceptions';

export const onlyAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.isAdmin) return next(new ForbiddenExceptions('Access denied.'));
  next();
};

function isAllow(roles, allowList) {
  const isAllow = roles.some(role => allowList.includes(role.label));
  return isAllow;
}

export const onlyRegister = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['register'])) return next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyDoctor = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['doctor'])) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyPharmacy = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['pharmacy'])) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyLab = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['lab'])) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyXray = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['xray'])) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyCashier = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['cashier'])) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyReport = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['report'])) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const registerOrAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['register']) && !req.user.isAdmin)
    return next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const doctorOrAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['doctor']) && !req.user.isAdmin) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const pharmacyOrAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['pharmacy']) && !req.user.isAdmin) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const labOrAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['lab']) && !req.user.isAdmin) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const xrayOrAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['xray']) && !req.user.isAdmin) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const cashierOrAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['cashier']) && !req.user.isAdmin) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const reportOrAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!isAllow(req.user.roles, ['report']) && !req.user.isAdmin) next(new ForbiddenExceptions('Access denied.'));
  next();
};
