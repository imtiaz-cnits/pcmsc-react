const createError = require("http-errors");
const mongoose = require("mongoose");
const Subject = require("../../models/subjectModel");

// 📝 do add subject
async function addSubject(req, res, next) {
  try {
    // console.log("payloads ", req.body);

    const {
      subjectCode,
      subjectName,
      totalMark,
      writtenMark,
      oralMark,
      passMark,
      className,
      status,
    } = req.body;

    const exists = await Subject.findOne({
      subjectCode: { $regex: `^${subjectCode}$`, $options: "i" },
    });

    // console.log("exists", exists);

    if (exists) {
      return res.status(409).json({ message: "Already exists." });
    }

    // 👤 create new add exam-type object
    const newSubject = new Subject({
      subjectCode,
      subjectName,
      totalMark: Number(totalMark),
      writtenMark: Number(writtenMark),
      oralMark: Number(oralMark),
      passMark: Number(passMark),
      className,
      status: status || "Active",
    });

    await newSubject.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      data: newSubject,
    });
  } catch (error) {
    console.log(" ❌ Error in addExamType : ", error);

    return next(error);
  }
}

// 📝 get all subjects
async function getAllSubjects(req, res, next) {
  try {
    console.log("📥 Received request for getAllSubjects : ", req.body);

    const subjects = await Subject.find();
    const totalDocuments = await Subject.countDocuments();

    if (!subjects || subjects.length === 0) {
      return next(createError(404, "Subject not found!"));
    }

    console.log("🔑 Fetched all subjects:", subjects);

    return res.status(200).json({
      success: true,
      message: "Subjects fetched successfully!",
      totalEntries: totalDocuments,
      data: subjects,
    });
  } catch (error) {
    console.error("❌ Error fetching getAllSubjects :", error);

    // 💬 Passing the error to the next middleware
    return next(error);
  }
}

// 📝 Get all paginated subjects
async function getAllPaginatedSubjects(req, res, next) {
  try {
    console.log(
      "📥 Received request for getAllPaginatedSubjects : ",
      req.query,
    );
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const { keyword } = req.query;

    // todo need to be more optimistic
    const searchQuery = keyword
      ? {
          $or: [
            { subjectCode: { $regex: keyword.trim(), $options: "i" } },
            { subjectName: { $regex: keyword.trim(), $options: "i" } },
          ],
        }
      : {};

    const query = { $and: [searchQuery].filter(Boolean) };

    const subjects = await Subject.find(query)
      .sort({ subjectCode: 1 })
      .skip(skip)
      .limit(limit)
      .populate("className");

    console.log("subjects : ", subjects);

    const totalEntries = await Subject.countDocuments(query);

    const totalPages = Math.ceil(totalEntries / limit);

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved subjects",
      currentPage: page,
      totalEntries: Number(totalEntries),
      totalPages: Number(totalPages),
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    console.log(" <UNK> Error fetching getSubjects :", error);
    return next(error);
  }
}

// 📝 update
async function updateSubject(req, res, next) {
  try {
    console.log("📥 Received subject params: ", req.params);
    console.log("📥 Received subject body: ", req.body);

    const { id } = req.params;
    const { subjectCode } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid exam type ID."));
    }

    const existingObject = await Subject.findById(id);

    if (!existingObject || existingObject.length === 0) {
      return next(createError(404, "No subjects found."));
    }

    const duplicateObject = await Subject.findOne({
      subjectCode,
      _id: { $ne: id },
    });

    console.log("duplocaton", duplicateObject);

    if (duplicateObject) {
      console.log("click");
      return next(createError(409, "Already exists."));
    }

    const updatedData = await Subject.findByIdAndUpdate(
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
async function deleteSubject(req, res, next) {
  try {
    console.log("deleted subject params ", req.params);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid exam type ID."));
    }

    const deletedItem = await Subject.findByIdAndDelete(id);

    console.log("✅ Subject deleted:", deletedItem);

    if (!deletedItem) {
      console.warn(`⚠️ Subject with ID "${id}" not found or already deleted.`);
      return next(createError(404, "Subject not found or already deleted."));
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted.",
      deletedItem,
    });
  } catch (error) {
    console.log("❌  Error -> getAllPaginatedSubjects  : ", error);
    return next(error);
  }
}

module.exports = {
  addSubject,
  getAllSubjects,
  getAllPaginatedSubjects,
  updateSubject,
  deleteSubject,
};
