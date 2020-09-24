import { ForbiddenExceptions } from '../common/helpers/exceptions';

export const onlyAdmin = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.isAdmin) return next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyRegister = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.groups.includes('register')) return next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyDoctor = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.groups.includes('doctor')) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyPharmacy = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.groups.includes('pharmacy')) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyLab = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.groups.includes('lab')) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyXray = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.groups.includes('xray')) next(new ForbiddenExceptions('Access denied.'));
  next();
};

export const onlyCashier = (req, res, next) => {
  // 403 Forbidden
  if (!req.user.groups.includes('cashier')) next(new ForbiddenExceptions('Access denied.'));
  next();
};
