import path from 'path';

require('dotenv').config();

const DEFAULT_AVATAR_PATH = path.join(path.parse(__dirname).dir, '..', '..', 'media', 'default');

export default {
  PAGE_LIMIT: process.env.PAGE_LIMIT || 20,
  DB_URI: process.env.VC_API_DB_URI,
  ENABLE_SEARCH_OLD_HN: (process.env.VC_API_ENABLE_SEARCH_OLD_HN || 'false') === 'true',
  JWT_SECRET: process.env.VC_JWT_SECRET || 'dev_jwt_secret_key',
  CORS_OPTIONS: { origin: '*' },
  // LINE_NOTIFY_CLIENT_ID: process.env.LINE_NOTIFY_CLIENT_ID,
  // LINE_NOTIFY_CLIENT_SECRET: process.env.LINE_NOTIFY_CLIENT_SECRET,
  DEFAULT_AVATAR: path.join(DEFAULT_AVATAR_PATH, 'avatar.svg'),
  DEFAULT_AVATAR_PET: path.join(DEFAULT_AVATAR_PATH, 'avatar.svg'),
};
