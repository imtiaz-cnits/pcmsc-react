const multer = require("multer");
const path = require("path");
const fs = require("fs");

function uploader(
  subfolder_path,
  max_file_size,
  field_name,
  allowed_file_types,
  error_msg,
) {
  const UPLOADS_FOLDER = path.resolve(__dirname, `../${subfolder_path}`);

  // check if folder exists or not
  if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
  }

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      let filename;
      console.log(fileExt);
      console.log(file.originalname.trim()[0] === ".");
      if (file.originalname.trim()[0] === ".") {
        filename = "file";
      } else {
        filename = file.originalname
          .replace(fileExt, "")
          .trim()
          .replace(/\s+/g, " ") // Convert multiple spaces to a single space
          .replace(/[^a-zA-Z0-9\s.-]/g, "") // Remove special characters except `.` & `-`
          .replace(/\.+/g, ".") // Replace multiple dots (`..`) with a single dot
          .replace(/^-+|-+$/g, "") // Remove hyphens from start & end
          .toLowerCase()
          .split(" ")
          .join("-");
      }

      cb(null, `${filename}-${Date.now()}${fileExt}`);
    },
  });

  // preapre the final multer upload object
  const upload = multer({
    storage,
    limits: { fileSize: max_file_size },
    fileFilter: (req, file, cb) => {
      if (file.fieldname !== field_name) {
        const error = new Error("Field name mismatch.");
        error.status = 400;
        error.name = "FieldError";
        return cb(error);
      }

      if (!allowed_file_types.includes(file.mimetype)) {
        const error = new Error(error_msg || "Invalid file type.");
        error.status = 400;
        error.name = "FileTypeError";
        return cb(error);
      }

      return cb(null, true);
    },
  });

  return upload;
}

module.exports = uploader;
