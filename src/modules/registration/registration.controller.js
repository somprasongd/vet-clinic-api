import * as service from './registration.service';
import paginate from '../../common/helpers/res-with-paginate';

export const handleList = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.searchRegistration(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};
