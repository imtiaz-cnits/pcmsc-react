const createError = require("http-errors");
const mongoose = require("mongoose");
const ExamAssign = require("../../models/examAssignModel");

// 📝 do add exam
async function addExam(req, res, next) {
  try {
    const { session, examName, className, examDate, resultDateTime } = req.body;

    // 👤 create new add exam-type object
    const newExamObj = new ExamAssign({
      session,
      examName,
      className,
      examDate,
      resultDateTime,
    });

    await newExamObj.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      data: newExamObj,
    });
  } catch (error) {
    console.log(" ❌ Error in addExam : ", error);

    return next(error);
  }
}

// 📝 get all assigned exams
async function getAllAssignedExam(req, res, next) {
  try {
    const assignedExam = await ExamAssign.find();
    const totalDocuments = await ExamAssign.countDocuments();

    if (!assignedExam || assignedExam.length === 0) {
      return next(createError(404, "Not found!"));
    }

    console.log("🔑 Fetched all assignedExam:", assignedExam);

    return res.status(200).json({
      success: true,
      message: "Exams fetched successfully!",
      count: assignedExam.length,
      totalEntries: totalDocuments,
      data: assignedExam,
    });
  } catch (error) {
    console.error("❌ Error fetching getAllAssignedExam :", error);

    return next(error);
  }
}

// 📝 Get all paginated assigned exams
async function getAllPaginatedAssignedExams(req, res, next) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 5);
    const skip = (page - 1) * limit;
    const keyword = req.query.keyword.trim();
    const searchRegex = keyword !== "" ? new RegExp(keyword, "i") : null;

    // console.log("keywrod value ", keyword);
    // console.log("keyword  reg ", searchRegex);

    /*
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

  

      */

    const baseLookups = [
      {
        $lookup: {
          from: "sessions",
          localField: "session",
          foreignField: "_id",
          as: "session",
        },
      },
      { $unwind: { path: "$session", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "examtypes",
          localField: "examName",
          foreignField: "_id",
          as: "examName",
        },
      },
      { $unwind: { path: "$examName", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "classes",
          localField: "className",
          foreignField: "_id",
          as: "className",
        },
      },
      // { $unwind: { path: "$className", preserveNullAndEmptyArrays: true } },
    ];

    const keywordMatch = searchRegex
      ? [
          {
            $match: {
              $or: [
                { "session.name": searchRegex },
                { "session.nameLabel": searchRegex },
                { "examName.examTypeName": searchRegex },
                { "className.name": searchRegex },
                { "className.nameLabel": searchRegex },
                { examDate: searchRegex },
                { resultDateTime: searchRegex },
              ],
            },
          },
        ]
      : [];

    const dataPipeline = [
      ...baseLookups,
      ...keywordMatch,
      { $skip: skip },
      { $limit: limit },
    ];

    const countPipeLine = [
      ...baseLookups,
      ...keywordMatch,
      { $count: "total" },
    ];

    const assignedExams = await ExamAssign.aggregate(dataPipeline);
    const countResult = await ExamAssign.aggregate(countPipeLine);
    const total = await ExamAssign.countDocuments();

    // const rawResult = await ExamAssign.find({}).populate(
    //   "session examName className",
    // );
    // console.log("raw result : ", JSON.stringify(rawResult, 2, null));

    // console.log("keyword match : ", keywordMatch);
    // console.log("baselookup : ", baseLookups);
    // console.log("assigned exams : ", assignedExams);
    // console.log("count result : ", countResult);

    // const collections = await mongoose.connection.db
    //   .listCollections()
    //   .toArray();
    // const collectionNames = collections.map((collection) => collection.name);
    // console.log("Collections:", collectionNames);

    const totalEntries = countResult[0]?.total || 0;

    const totalPages = Math.ceil(totalEntries / limit);

    // console.log("total entries ", totalEntries);
    // console.log("total pages ", totalPages);

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved assignedExams",
      currentPage: page,

      totalEntries,
      total,
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
    // console.log("📥 Received assign exam params: ", req.params);
    // console.log("📥 Received assign exam body: ", req.body);

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
