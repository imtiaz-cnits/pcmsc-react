require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = require('./app');

const port = process.env.PORT || 4000;

// file upload foalder
const UPLOADS_FOLDER = path.join(__dirname, 'uploads');

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
    // moment tye.jpg ->

    const fileExt = path.extname(file.originalname);
    let filename;
    console.log(fileExt);
    console.log(file.originalname.trim()[0] === '.');
    if (file.originalname.trim()[0] === '.') {
      filename = 'file';
    } else {
      filename = file.originalname
        .replace(fileExt, '')
        .trim()
        .replace(/\s+/g, ' ') // Convert multiple spaces to a single space
        .replace(/[^a-zA-Z0-9\s.-]/g, '') // Remove special characters except `.` & `-`
        .replace(/\.+/g, '.') // Replace multiple dots (`..`) with a single dot
        .replace(/^-+|-+$/g, '') // Remove hyphens from start & end
        .toLowerCase()
        .split(' ')
        .join('-');
    }

    cb(null, `${filename}-${Date.now()}${fileExt}`);
  },
});

// prepare the final multer upload object
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // Max file size of 1MB
  fileFilter: (req, file, cb) => {
    console.log(file);
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (file.fieldname === 'avatar') {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        const error = new Error('Only .jpg, .png or .jpeg format allowed!');
        error.status = 400;
        error.name = 'MulterError : FileTypeError';
        cb(error);
      }
    } else {
      const error = new Error('There was an error!');
      error.status = 400;
      error.name = 'MulterError : FieldTypeError';
      cb(error);
    }
  },
});

// 🛠️ basic route check
app.post('/', upload.array('avatar', 2), (req, res) => {
  console.log('is : ', req.files); // multer uploaded files access
  res.send('Hello uploaded');
});

// 🚀 Start the server and listen on the defined port
app
  .listen(port, () => {
    console.log(`✅ Server is running at: http://localhost:${port}`);
  })
  .on('error', (err) => {
    console.error(`❌ Server failed to start: ${err.message}`);
  });
