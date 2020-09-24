import { InvalidExceptions } from './exceptions';

export default (data, schema, options = { allowUnknown: true, stripUnknown: true, abortEarly: false }) => {
  const { error, value } = schema.validate(data, options);
  if (error) {
    throw new InvalidExceptions(error.details.reduce((msg, error) => `${msg}, ${error.message}`, '').substring(2));
  }
  return { error, dto: value };
};
