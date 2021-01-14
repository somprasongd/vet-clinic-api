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
    const error = new InvalidExceptions('Not an image! Please upload only images.');
    cb(error, false);
  }
};

const multerUploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadAvatar = multerUploadAvatar.single('avatar');

export const resizeAvatar = (req, res, next) => {
  if (!req.file) return next();

  const uuid = uuidv1();

  const fileName = `${req.user.id}-${uuid}`;

  req.file.filename = `media/avatar/${fileName}.jpeg`;
  req.file.filenameThumbnail = `media/avatar/${fileName}_thumbnail.jpeg`;
  req.file.filenameThumbnailSmall = `media/avatar/${fileName}_thumbnail_sm.jpeg`;

  sharp(req.file.buffer)
    .resize(200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filename);

  sharp(req.file.buffer)
    .resize(100)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filenameThumbnail);

  sharp(req.file.buffer)
    .resize(50)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filenameThumbnailSmall);

  next();
};

const multerUploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadImage = multerUploadImage.single('image');

export const resizeImage = (req, res, next) => {
  if (!req.file) return next();

  const uuid = uuidv1();
  const { group = 'img', typeId = 1 } = req.body;
  const { visit = null, pet = null } = req;

  let no = group;

  if (visit !== null) {
    no = visit.vn;
  } else if (pet !== null) {
    no = pet.code;
  }

  const fileName = `${no}-${typeId}-${uuid}`;

  req.file.filename = `media/image/${fileName}.jpeg`;
  req.file.filenameThumbnail = `media/image/${fileName}_thumbnail.jpeg`;
  req.file.filenameThumbnailSmall = `media/image/${fileName}_thumbnail_sm.jpeg`;

  sharp(req.file.buffer)
    // .resize(500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filename);

  sharp(req.file.buffer)
    .resize(200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filenameThumbnail);

  sharp(req.file.buffer)
    .resize(80)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(req.file.filenameThumbnailSmall);

  next();
};

const multerFileStorage = multer.diskStorage({
  destination: (req, refiles, cb) => {
    cb(null, 'media/file');
  },
  filename: (req, file, cb) => {
    const uuid = uuidv1();

    const { visit = null, pet = null } = req;

    let no = '';

    if (visit !== null) {
      no = visit.vn;
    } else if (pet !== null) {
      no = pet.code;
    }

    const fileName = `${no}-${uuid}`;
    cb(null, `${fileName}-${file.originalname.split(' ').join('-')}`);
  },
});

const multerUploadFile = multer({
  storage: multerFileStorage,
});

export const uploadFile = multerUploadFile.single('file');
