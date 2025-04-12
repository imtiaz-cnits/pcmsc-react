const uploader = require("../../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "uploads/avatar",
    1 * 1024 * 1024,
    "avatar",
    ["image/png", "image/jpg", "image/jpeg", "image/gif"],
    "Only .jpg, .png or .jpeg format allowed!",
  );

  // ✅ Use upload.single() as a middleware
  upload.single("avatar")(req, res, (err) => {
    if (err) return next(err); // 🔁 delegate to global error handler

    if (!req.file) {
      const noFileErr = new Error("No valid image uploaded.");
      noFileErr.status = 400;
      noFileErr.name = "NoFileError";
      return next(noFileErr); // 🔁 also goes to global handler
    }

    return next(); // ✅ Success
  });
}

module.exports = avatarUpload;
