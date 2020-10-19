import axios from 'axios';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';

import * as service from './line.service';
import config from '../../common/config';
import { InvalidExceptions } from '../../common/helpers/exceptions';

const { LINE_NOTIFY_CLIENT_ID, LINE_NOTIFY_CLIENT_SECRET } = config;

export const connectLineNotify = async (req, res) => {
  const { memberId } = req.params;
  const { confirm } = req.query;

  if (confirm === 'yes') {
    const REDIRECT_URI = `${req.getHost()}/api/line/notify/callback`;

    const params = `response_type=code&client_id=${LINE_NOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}?uid=${memberId}&scope=notify&state=${uuidv4()}`;

    return res.redirect(`https://notify-bot.line.me/oauth/authorize?${params}`);
  }

  return res.render('line-notify', { link: `${req.getHost()}/api/line/notify/${memberId}/connect?confirm=yes` });
};

export const callbackLineNotify = async (req, res) => {
  const { uid, code, state } = req.query;

  const REDIRECT_URI = `${req.getHost()}/api/line/notify/callback`;

  const body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${REDIRECT_URI}?uid=${uid}`,
    client_id: `${LINE_NOTIFY_CLIENT_ID}`,
    client_secret: `${LINE_NOTIFY_CLIENT_SECRET}`,
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const { data } = await axios.post('https://notify-bot.line.me/oauth/token', querystring.stringify(body), config);

    const { access_token: lineToken } = data;

    const newToken = { memberId: uid, lineToken };

    await service.create(newToken);

    res.send('<h1>การเชื่อมต่อสำเร็จ</h1>');
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>พบข้อผิดพลาด</h1>');
  }
};

export const sendLineNotify = async (req, res) => {
  const { dto: message } = req;

  const { memberId } = req.params;

  const tokens = await service.listByMemberId(memberId);

  if (!tokens) return new InvalidExceptions('This member no have line notify tokens.');

  tokens.forEach(token => {
    try {
      sendLineNotifyMessage(token.lineToken, message);
    } catch (err) {
      console.error(`Can not send notify to ${token}`, err);
    }
  });
  res.status(204).end();
};

export const sendLineNotifyMessage = async (token, message) => {
  if (!token) throw new Error('No line access token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return await axios.post('https://notify-api.line.me/api/notify', querystring.stringify({ ...message }), config);
  } catch (err) {
    console.error(`Can not send notify to ${token}`, err.response);
    throw err;
  }
};

export const revokeAllLineNotifyTokens = async (req, res) => {
  const { memberId } = req.params;

  await revokeAllLineNotifyTokensByOwnerId(memberId);

  res.send();
};

export const revokeAllLineNotifyTokensByOwnerId = async memberId => {
  const tokens = await service.listByMemberId(memberId);

  tokens.forEach(token => {
    try {
      revokeAllLineNotifyTokensByToken(token.lineToken);
    } catch (err) {
      console.error(`Can not revoke token ${token}`, err);
    }
  });
};

export const revokeAllLineNotifyTokensByToken = async token => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.post('https://notify-api.line.me/api/revoke', '', config);
    await service.deleteByToken(token);
  } catch (err) {
    throw err;
  }
};
