import multer from 'multer';

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); //folder to save image
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // save original filename
  },
});

export const uploadFile = multer({ storage: storage, fileFilter: imageFilter });
