import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {};

const upload = multer({
  storage,
  limits: { fieldSize: 1024 * 1024 },
});


 export default upload;