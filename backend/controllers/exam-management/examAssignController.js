const createError = require("http-errors");
const mongoose = require("mongoose");
const ExamAssign = require("../../models/examAssignModel");

// 📝 do add exam
async function addExam(req, res, next) {
  try {
    console.log("payloads ", req.body);

    const { session, examName, className, examDate, resultDateTime } = req.body;

    // todo
    // const exists = await ExamAssign.findOne({
    //   subjectCode: { $regex: `^${subjectCode}$`, $options: "i" },
    // });

    // console.log("exists", exists);

    // if (exists) {
    //   return res.status(409).json({ message: "Already exists." });
    // }

    // 👤 create new add exam-type object
    const newSubject = new ExamAssign({
      session,
      examName,
      className,
      examDate,
      resultDateTime,
    });

    await newSubject.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      data: newSubject,
    });
  } catch (error) {
    console.log(" ❌ Error in addExam : ", error);

    return next(error);
  }
}

// 📝 get all assigned exams
async function getAllAssignedExam(req, res, next) {
  try {
    console.log("📥 Received request for getAllAssignedExam : ", req.body);

    const assignedExam = await ExamAssign.find();
    const totalDocuments = await ExamAssign.countDocuments();

    if (!assignedExam || assignedExam.length === 0) {
      return next(createError(404, "Not found!"));
    }

    console.log("🔑 Fetched all assignedExam:", assignedExam);

    return res.status(200).json({
      success: true,
      message: "Exams fetched successfully!",
      totalEntries: totalDocuments,
      data: assignedExam,
    });
  } catch (error) {
    console.error("❌ Error fetching getAllAssignedExam :", error);

    // 💬 Passing the error to the next middleware
    return next(error);
  }
}

// 📝 Get all paginated assigned exams
async function getAllPaginatedAssignedExams(req, res, next) {
  try {
    console.log(
      "📥 Received request for getAllPaginatedSubjects : ",
      req.query,
    );
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 5);
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword.trim().toLowerCase();

    // todo need to be more optimistic
    const searchQuery = keyword
      ? {
          $or: [
            { session: { $regex: keyword, $options: "i" } },
            { examName: { $regex: keyword, $options: "i" } },
            { examDate: { $regex: keyword, $options: "i" } },
            { resultDateTime: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const query = { $and: [searchQuery].filter(Boolean) };

    const assignedExams = await ExamAssign.find(query)
      .skip(skip)
      .limit(limit)
      .populate("session")
      .populate("examName")
      .populate("className");

    const totalEntries = await ExamAssign.countDocuments();

    const totalPages = Math.ceil(totalEntries / limit);

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved assignedExams",
      currentPage: page,
      totalEntries,
      totalPages: Number(totalPages),
      count: assignedExams.length,
      data: assignedExams,
    });
  } catch (error) {
    console.log(" <UNK> Error fetching getAllPaginatedAssignedExams :", error);
    return next(error);
  }
}

// 📝 update
async function updateAssignedExam(req, res, next) {
  try {
    console.log("📥 Received assign exam params: ", req.params);
    console.log("📥 Received assign exam body: ", req.body);

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid exam type ID."));
    }

    // todo
    // const existingObject = await ExamAssign.findById(id);

    // if (!existingObject || existingObject.length === 0) {
    //   return next(createError(404, "No subjects found."));
    // }

    // const duplicateObject = await ExamAssign.findOne({
    //   subjectCode,
    //   _id: { $ne: id },
    // });

    // console.log("duplocaton", duplicateObject);

    // if (duplicateObject) {
    //   console.log("click");
    //   return next(createError(409, "Already exists."));
    // }

    const updatedData = await ExamAssign.findByIdAndUpdate(
      id,
      req.body,

      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Updated successfully !.",
      updatedData,
    });
  } catch (error) {
    console.error("❌ updateAssignedExam ", error);
    return next(error);
  }
}

// 📝 Delete Assigned Exams
async function deleteAssignExam(req, res, next) {
  try {
    console.log("deleteAssignExam params ", req.params);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid exam type ID."));
    }

    const deletedItem = await ExamAssign.findByIdAndDelete(id);

    console.log("✅ Assigned Exam deleted:", deletedItem);

    if (!deletedItem) {
      console.warn(
        `⚠️ Assigned Exam with ID "${id}" not found or already deleted.`,
      );
      return next(
        createError(404, " Assigned Exam not found or already deleted."),
      );
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted.",
      deletedItem,
    });
  } catch (error) {
    console.log("❌  Error -> deleteAssignExam  : ", error);
    return next(error);
  }
}

module.exports = {
  addExam,
  getAllAssignedExam,
  getAllPaginatedAssignedExams,
  updateAssignedExam,
  deleteAssignExam,
};
