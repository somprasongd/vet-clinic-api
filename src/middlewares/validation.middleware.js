import Joi from 'joi';
import config from '../common/config';
import { InvalidExceptions } from '../common/helpers/exceptions';

function validatePagination(data) {
  const defaultLimit = +config.PAGE_LIMIT;
  const schema = Joi.object().keys({
    limit: Joi.number()
      .min(0)
      .default(defaultLimit),
    offset: Joi.number().min(0),
    page: Joi.number().min(1),
  });

  return schema.validate(data, { allowUnknown: true });
}
export const validPagination = (req, res, next) => {
  const { error, value } = validatePagination(req.query);

  if (error) return next(new InvalidExceptions(error.details[0].message));

  const { limit, offset, page } = value;

  req.query.limit = limit === 0 ? 'all' : limit;
  req.query.offset = 0;
  req.query.page = 1;

  if (limit > 0) {
    if (req.query.hasOwnProperty('offset')) {
      req.query.offset = offset;
      req.query.page = undefined;
    } else if (req.query.hasOwnProperty('page')) {
      req.query.page = page;
      req.query.offset = (page - 1) * req.query.limit;
    }
  }

  next();
};

export const validId = (req, res, next) => {
  const reg = new RegExp('^[0-9]+$');
  if (!reg.test(req.params.id)) return next(new InvalidExceptions('Invalid parameter id.'));
  next();
};
