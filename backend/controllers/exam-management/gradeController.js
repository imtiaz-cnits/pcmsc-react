const createError = require("http-errors");
const mongoose = require("mongoose");
const Grade = require("../../models/gradeModel");

// 📝 do add subject
async function addGradingSystem(req, res, next) {
  try {
    // console.log("payloads ", req.body);

    const { gradeName, totalSubjectMark, markFrom, markUpTo, gradePoint } =
      req.body;

    // todo
    // const exists = await Grade.findOne({
    //   subjectCode: { $regex: `^${subjectCode}$`, $options: "i" },
    // });

    // console.log("exists", exists);

    // todo
    // if (exists) {
    //   return res.status(409).json({ message: "Already exists." });
    // }

    // 👤 Create new grade object
    const newGrade = new Grade({
      gradeName,
      totalSubjectMark: Number(totalSubjectMark || 100),
      markFrom: Number(markFrom),
      markUpTo: Number(markUpTo),
      gradePoint: Number(gradePoint),
    });

    await newGrade.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      data: newGrade,
    });
  } catch (error) {
    console.log(" ❌ Error in addGradingSystem : ", error);

    return next(error);
  }
}

// 📝 Get all paginated grading system
async function getAllGrades(req, res, next) {
  try {
    console.log("📥 Received request for getAllGrades : ", req.query);
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 5);
    const keyword = req.query.keyword?.trim();

    const searchQuery = keyword
      ? { gradeName: { $regex: keyword, $options: "i" } }
      : {};

    const query = { $and: [searchQuery].filter(Boolean) };

    const grading = await Grade.find(query).sort({ gradeName: 1 });

    console.log("grading : ", grading);

    const totalEntries = await Grade.countDocuments(query);

    const totalPages = Math.ceil(totalEntries / limit);

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved grading system",
      currentPage: page,
      totalEntries: Number(totalEntries),
      totalPages: Number(totalPages),
      count: grading.length,
      data: grading,
    });
  } catch (error) {
    console.log(" <UNK> Error fetching getAllGrades :", error);
    return next(error);
  }
}

// 📝 update
async function updateGrading(req, res, next) {
  try {
    console.log("📥 Received grading params: ", req.params);
    console.log("📥 Received grading body: ", req.body);

    const { id } = req.params;
    const { gradeName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid grade type ID."));
    }

    const existingObject = await Grade.findById(id);

    if (!existingObject || existingObject.length === 0) {
      return next(createError(404, "No Grades found."));
    }

    const duplicateObject = await Grade.findOne({
      gradeName,
      _id: { $ne: id },
    });

    console.log("duplocaton", duplicateObject);

    if (duplicateObject) {
      console.log("click");
      return next(createError(409, "Already exists."));
    }

    const updatedData = await Grade.findByIdAndUpdate(
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
    console.error("❌ updateSubject ", error);
    return next(error);
  }
}

// 📝 Delete Subjects
async function deleteGrade(req, res, next) {
  try {
    console.log("deleted grade params ", req.params);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid exam type ID."));
    }

    const deletedItem = await Grade.findByIdAndDelete(id);

    console.log("✅ Grade deleted:", deletedItem);

    if (!deletedItem) {
      console.warn(`⚠️ Grade with ID "${id}" not found or already deleted.`);
      return next(createError(404, "Grade not found or already deleted."));
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted.",
      deletedItem,
    });
  } catch (error) {
    console.log("❌  Error -> deleteGrade  : ", error);
    return next(error);
  }
}

module.exports = { addGradingSystem, getAllGrades, updateGrading, deleteGrade };
