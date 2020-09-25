import { respondUploadDTO } from './upload.dto';
import * as service from './upload.service';

export const createUpload = async (req, res) => {
  const { dto } = req;

  const result = await service.create(dto);

  const mediaUrl = `${req.getHost()}/`;

  res.json(respondUploadDTO(result, mediaUrl));
};

// export const findAll = async (req, res) => {
//   const { limit, offset, page } = req.query;
//   const mediaUrl = `${req.getHost()}/`;
//   const { datas, counts } = await db.task(async t => {
//     const p1 = t.manyOrNone(
//       `SELECT
//       id
//       , '${mediaUrl}' || image as image
//       , '${mediaUrl}' || thumbnail as thumbnail
//       , '${mediaUrl}' || thumbnail_small as thumbnail_small
//       , timestamp
//       FROM pets_imageprofile
//       offset $<offset> limit $<limit>`,
//       {
//         offset,
//         limit,
//       }
//     );
//     const p2 = t.one(`SELECT count(*) FROM pets_imageprofile`, {}, a => +a.count);
//     const [datas, counts] = await Promise.all([p1, p2]);

//     return { datas, counts };
//   });

//   const results = paginate(datas, counts, limit, offset, page);
//   res.json(results);
// };

export const findOne = async (req, res) => {
  const result = await service.findById(req.params.id);

  if (!result) return res.status(404).json({ error: { message: 'The imageprofile with the given ID was not found.' } });

  const mediaUrl = `${req.getHost()}/`;

  res.json(respondUploadDTO(result, mediaUrl));
};

export const remove = async (req, res) => {
  await service.deleteById(req.params.id);

  res.status(204).end();
};
