import bcrypt from '../../common/helpers/bcrypt';
import { InvalidExceptions } from '../../common/helpers/exceptions';
import { generateRefreshToken, generateAccessToken } from '../../common/helpers/token';
import { respondAuthDTO } from './auth.dto';
import * as service from './auth.service';

export const login = async (req, res) => {
  const { dto } = req;

  const user = await service.getUserByUsername(dto.username);
  if (!user) throw new InvalidExceptions('Invalid username or password.');

  const validPassword = await bcrypt.compare(dto.password, user.password);
  if (!validPassword) throw new InvalidExceptions('Invalid username or password.');

  const { refreshKey, refreshToken } = generateRefreshToken(user.id);
  const accessToken = generateAccessToken({ ...user, refreshKey });

  const token = { accessToken, refreshToken };
  // generateAuthToken(user);

  res.json(respondAuthDTO(user, token));
};

export const refresh = async (req, res) => {
  const payload = req.user;
  const accessToken = generateAccessToken(payload);

  res.json({ accessToken });
};
