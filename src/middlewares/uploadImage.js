import multer from 'multer';
import sharp from 'sharp';
import { v1 as uuidv1 } from 'uuid';
import { InvalidExceptions } from '../common/helpers/exceptions';

// const multerStorage = multer.diskStorage({
//   destination: (req, refiles, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    const error = InvalidExceptions('Not an image! Please upload only images.');
    cb(error, false);
  }
};

const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadAvatarPhoto = uploadAvatar.single('image');

export const resizeAvatarPhoto = (req, res, next) => {
  if (!req.file) return next();

  const uuid = uuidv1();

  req.file.filename = `media/images/${req.user.id}-${uuid}.jpeg`;
  req.file.filenameThumbnail = `media/images/${req.user.id}-${uuid}_thumbnail.jpeg`;
  req.file.filenameThumbnailSmall = `media/images/${req.user.id}-${uuid}_thumbnail_sm.jpeg`;

  sharp(req.file.buffer)
    // .resize(500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filename);

  sharp(req.file.buffer)
    .resize(170)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filenameThumbnail);

  sharp(req.file.buffer)
    .resize(32)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filenameThumbnailSmall);

  next();
};

const uploadVisit = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadVisitImage = uploadVisit.single('image');

export const resizeVisitImage = (req, res, next) => {
  if (!req.file) return next();

  const uuid = uuidv1();
  const { visitId } = req.params;
  const { mediatypeId = 1 } = req.body;

  req.file.filename = `media/visit/images/${visitId}-${mediatypeId}-${uuid}.jpeg`;
  req.file.filenameThumbnail = `media/visit/images/${visitId}-${mediatypeId}-${uuid}_thumbnail.jpeg`;

  sharp(req.file.buffer)
    // .resize(500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filename);

  sharp(req.file.buffer)
    .resize(170)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filenameThumbnail);

  next();
};

const multerVisitDocStorage = multer.diskStorage({
  destination: (req, refiles, cb) => {
    cb(null, 'media/visit/files');
  },
  filename: (req, file, cb) => {
    const { visitId } = req.params;
    const { mediatypeId = 1 } = req.body;
    cb(null, `visit-${visitId}-${mediatypeId}-${Date.now()}-${file.originalname.split(' ').join('-')}`);
  },
});

const uploadDoc = multer({
  storage: multerVisitDocStorage,
});

export const uploadVisitDoc = uploadDoc.single('file');
