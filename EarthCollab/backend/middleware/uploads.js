const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  //NOTE: "cb" = "callback" - Multer function.
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //require a timestamp be attached to ensure unique value for identification.
  },
});

const uploadFile = multer({ storage: storage }).single("file"); //for single file uploaded.

module.exports = { uploadFile };
