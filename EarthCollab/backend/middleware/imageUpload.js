const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/images/",
  //NOTE: "cb" = "callback" - Multer function.
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //require a timestamp be attached to ensure unique value for identification.
  },
});

const imageUpload = multer({ storage: storage }).single("file"); //for single file uploaded.

module.exports = { imageUpload };
