export default (results, total, limit, offset, page) => {
  const result = {
    results,
    count: total,
    limit,
  };

  if (limit !== 'all' && page !== undefined) {
    result.page = page;
    result.pages = Math.ceil(total / limit) || 1;
    return result;
  }

  if (offset !== undefined) {
    result.offset = offset;
  }

  return result;
};
