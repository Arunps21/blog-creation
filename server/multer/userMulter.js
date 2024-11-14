const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const newName = Date.now() + "_" + Math.round(Math.random() * 1E9);
    cb(null, newName + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
