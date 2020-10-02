import * as service from './registration.service';
import paginate from '../../common/helpers/res-with-paginate';
import config from '../../common/config';

export const handleGetConfig = async (req, res) => {
  res.json({
    isEnableSearchOldHn: config.ENABLE_SEARCH_OLD_HN,
  });
};

export const handleList = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.searchRegistration(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};
