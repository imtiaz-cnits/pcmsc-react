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
async function getAllPaginatedGrades(req, res, next) {
  try {
    console.log("📥 Received request for getAllPaginatedGrades : ", req.query);
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 5);
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword?.trim();

    const searchQuery = keyword
      ? {
          $or: [
            { gradeName: { $regex: keyword, $options: "i" } },
            { gradePoint: Number(keyword) },
            { totalSubjectMark: Number(keyword) },
            { markFrom: Number(keyword) },
            { markUpTo: Number(keyword) },
          ],
        }
      : {};

    const query = { $and: [searchQuery].filter(Boolean) };

    const grading = await Grade.find(query)
      .sort({ gradeName: -1 })
      .skip(skip)
      .limit(limit);

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
    console.log(" <UNK> Error fetching getAllPaginatedGrades :", error);
    return next(error);
  }
}

module.exports = { addGradingSystem, getAllPaginatedGrades };
