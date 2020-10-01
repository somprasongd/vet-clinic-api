import path from 'path';
import { NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondUploadDTO } from './upload.dto';
import * as service from './upload.service';
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

export const sendUploadRespone = async (req, res) => {
  const json = req.uploadDTO;

  res.json(json);
};

export const getUpload = async (req, res) => {
  const result = await service.findById(req.params.id);

  if (!result) throw new NotFoundExceptions('The upload with the given ID was not found.');

  const mediaUrl = `${req.getHost()}/`;

  req.uploadDTO = respondUploadDTO(result, mediaUrl);
};

export const getFile = async (req, res) => {
  const { thumbnail = null } = req.query;
  const upload = await service.findById(req.params.id);

  if (!upload) throw new NotFoundExceptions('The upload with the given ID was not found.');

  let { filename } = upload;
  if (thumbnail !== null && upload.uploadType === 'image') {
    filename = thumbnail === 'sm' ? upload.filenameThumbnailSmall : upload.filenameThumbnail;
  }

  const file = path.join(path.parse(__dirname).dir, '..', '..', filename);
  res.sendFile(file);
};

export const removeUpload = async (req, res) => {
  await service.deleteById(req.params.id);

  res.status(204).end();
};
