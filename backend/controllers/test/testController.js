const ClassModel = require("../models/ClassModel");
const createError = require("http-errors");

// 📝 get all classes
async function getAllTest(req, res, next) {
  try {
    const classes = await ClassModel.find();

    if (!classes) {
      return next(createError(404, "Class not found!"));
    }

    // console.log("🔑 Fetched all classes:", classes);

    return res.status(200).json({
      success: true,
      message: "Classes fetched successfully!",
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    console.error("❌ Error fetching classes:", error);

    // 💬 Passing the error to the next middleware
    return next(error);
  }
}

// 📝 Get all shifts with pagination
async function getAllPaginatedTest(req, res, next) {
  try {
    // console.log("📥 Received request for shifts: ", req.query);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const classes = await ClassModel.find({}).skip(skip).limit(limit);

    const total = await ClassModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    // console.log("✅ Retrieved class: ", classes);
    return res.status(200).json({
      success: true,
      count: classes.length,
      currentPage: page,
      totalPages,
      total,
      data: classes,
    });
  } catch (error) {
    console.error("❌ Error fetching classes: ", error);
    return next(error);
  }
}

module.exports = { getAllTest, getAllPaginatedTest };
