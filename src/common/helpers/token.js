import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config';

const { JWT_SECRET } = config;

function hashRefresh(salt, refreshId) {
  return crypto
    .createHmac('sha512', salt)
    .update(refreshId)
    .digest('base64');
}

export const generateRefreshToken = userId => {
  const refreshId = userId + JWT_SECRET;
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = hashRefresh(salt, refreshId);
  const b = Buffer.from(hash);
  const refreshToken = b.toString('base64');
  return { refreshKey: salt, refreshToken };
};

export const generateAccessToken = ({ id, roles, isAdmin, refreshKey }) => {
  const payload = {
    id,
    roles,
    isAdmin,
    refreshKey,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

export const generateAuthToken = user =>
  jwt.sign({ id: user.id, groups: user.groups, isAdmin: user.isStaff }, JWT_SECRET);

export const verifyAuthToken = token => jwt.verify(token, JWT_SECRET);

export const verifyRefreshToken = (refreshToken, { refreshKey, id: userId }) => {
  const b = Buffer.from(refreshToken, 'base64');
  const token = b.toString();
  const refreshId = userId + JWT_SECRET;
  const hash = hashRefresh(refreshKey, refreshId);

  return hash === token;
};
