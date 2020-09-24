import { UnauthorizedExceptions, InvalidExceptions } from '../common/helpers/exceptions';
import { verifyAuthToken, verifyRefreshToken } from '../common/helpers/token';

export const validJWT = (req, res, next) => {
  const authorization = req.header('Authorization').split(' ');
  // 401 Unauthorized
  if (!authorization) return next(new UnauthorizedExceptions('Access denied. No token provided.'));
  if (authorization[0] !== 'Bearer') return next(new UnauthorizedExceptions('Access denied. Invalid token.'));

  try {
    const decoded = verifyAuthToken(authorization[1]);
    req.user = decoded;
    next();
  } catch (ex) {
    next(new UnauthorizedExceptions('Access denied. Invalid token.'));
  }
};

export const validRefresh = (req, res, next) => {
  const { refreshToken = null } = req.body;
  if (!refreshToken) {
    return next(new InvalidExceptions('need to pass refreshToken field'));
  }

  const isValid = verifyRefreshToken(req.body.refreshToken, req.user);

  if (!isValid) {
    return next(new InvalidExceptions('Invalid refresh token'));
  }
  next();
};
