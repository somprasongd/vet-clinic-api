import { InvalidExceptions } from './exceptions';

export default (
  data,
  schema,
  options = { allowUnknown: true, stripUnknown: true, abortEarly: false, handleError: true }
) => {
  const { handleError } = options;
  // remove handleError from joi options
  delete options.handleError;

  const { error, value } = schema.validate(data, options);

  if (error && handleError) {
    throw new InvalidExceptions(error.details.reduce((msg, error) => `${msg}, ${error.message}`, '').substring(2));
  }

  return { error, dto: value };
};
