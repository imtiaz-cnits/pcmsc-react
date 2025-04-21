const createError = require("http-errors");
const mongoose = require("mongoose");
const ExamType = require("../../models/examTypeModel");

// 📝 do add exam-type
async function addExamType(req, res, next) {
  try {
    console.log("payloda ", req.body);

    const { examTypeName, label, status } = req.body;

    const exists = await ExamType.findOne({
      examTypeName: { $regex: `^${examTypeName.trim()}$`, $options: "i" },
    });

    console.log("exists", exists);

    if (exists) {
      return res.status(409).json({ message: "Already exists." });
    }

    // 👤 create new add exam-type object
    const newExamType = new ExamType({
      examTypeName,
      label,
      status,
    });

    await newExamType.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      data: newExamType,
    });
  } catch (error) {
    console.log(" ❌ Error in addExamType : ", error);

    return next(error);
  }
}

// 📝 get all exam-types
async function getAllExamType(req, res, next) {
  try {
    const exmatypes = await ExamType.find({});

    if (!exmatypes || exmatypes.length === 0) {
      return next(createError(404, "No exam types found."));
    }

    return res.status(200).json({
      success: true,
      message: "Fetched Successfully!",
      count: exmatypes.length,
      data: exmatypes,
    });
  } catch (error) {
    console.error("❌ getAllExamType ", error);
    return next(error);
  }
}

// 📝 Get all class with pagination
async function getAllPaginatedExamTypes(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = Number(page - 1) * limit;
    const { keyword } = req.query;

    const searchQuery = keyword
      ? { examTypeName: { $regex: keyword.trim(), $options: "i" } }
      : {};

    const query = { $and: [searchQuery].filter(Boolean) };

    const examtypes = await ExamType.find(query).skip(skip).limit(limit);
    const totalExamTypes = await ExamType.countDocuments(query);

    console.log("📦 Total exam - types :", totalExamTypes);
    console.log("👨‍🎓 Exam types data:", examtypes.length);

    if (!examtypes || examtypes.length === 0) {
      return next(createError(404, "No exam types found."));
    }

    const totalPages = Math.ceil(totalExamTypes / limit);

    return res.status(200).json({
      success: true,
      message: "Fetched Successfully!",
      currentPage: page,
      totalPages,
      count: examtypes.length,
      totalEntries: totalExamTypes,
      data: examtypes,
    });
  } catch (error) {
    console.error("❌ getAllPaginatedExamTypes ", error);
    return next(error);
  }
}

// 📝 update
async function updateExamTypes(req, res, next) {
  try {
    console.log("📥 Received exam types params: ", req.params);
    console.log("📥 Received exam types body: ", req.body);

    const { id } = req.params;
    const payload = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid exam type ID."));
    }

    const exists = await ExamType.findById(id);

    if (!exists || exists.length === 0) {
      return next(createError(404, "No exam types found."));
    }

    const updatedExamTypes = await ExamType.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Exam type updated successfully.",
      updatedData: updatedExamTypes,
    });
  } catch (error) {
    console.error("❌ updateExamTypes ", error);
    return next(error);
  }
}

// 📝 Delete
async function deleteExamTypes(req, res, next) {
  try {
    console.log("📥 Received exam type ID for deletion:", req.params);

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid exam type ID."));
    }

    const existingExamType = await ExamType.findById(id);
    if (!existingExamType) {
      return next(createError(404, "Exam type not found."));
    }

    const deletedExamType = await ExamType.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Exam type deleted successfully.",
      count: deletedExamType.length,
      data: deletedExamType,
    });
  } catch (error) {
    console.error("❌ deleteExamTypes ", error);
    return next(createError(500, "Failed to delete exam type."));
  }
}

// ✅  module exports
module.exports = {
  addExamType,
  getAllExamType,
  getAllPaginatedExamTypes,
  updateExamTypes,
  deleteExamTypes,
};
