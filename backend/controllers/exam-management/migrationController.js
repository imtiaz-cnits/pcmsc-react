const createError = require("http-errors");

// 👉 internal imports
const Student = require("../../models/studentModel");
const MigrateStudent = require("../../models/migrationModel");
const getFilteredDate = require("../../utilities/dateFilter");

// 📝 do add migrated-student
async function migrateStudent(req, res, next) {
  try {
    console.log("payloads of addMigratedStudent ", req.body);

    const {
      studentName,
      registrationDate,
      classRoll,
      className,
      shift,
      passMark,
      section,
      session,
    } = req.body;

    // 👤 create new add migreated-student object
    const newMigreatedStudent = new MigrateStudent({
      studentName,
      registrationDate,
      classRoll,
      className,
      shift,
      passMark,
      section,
      session,
    });

    console.log("before enter to db : ", newMigreatedStudent);

    await newMigreatedStudent.save();

    return res.status(200).json({
      success: true,
      message: "Successfully Migrated!",
      data: newMigreatedStudent,
    });
  } catch (error) {
    console.log(" ❌ Error in addExamType : ", error);

    return next(error);
  }
}

// 📝 Get all migrate students by student-id
async function getMigratedStudents(req, res, next) {
  try {
    console.log("📥 Incoming request |  Query :", req.query);

    const { sid } = req.query;

    const studentData = await Student.findOne({ studentID: sid });

    console.log("studentData :", studentData);

    const totalStudents = await Student.countDocuments();

    console.log("📦 Total filtered students:", totalStudents);
    console.log("👨‍🎓 Students data:", studentData.length);

    if (!studentData || studentData.length === 0) {
      return next(createError(404, "No students found."));
    }

    return res.status(200).json({
      success: true,
      totalEntries: totalStudents,
      data: studentData,
    });
  } catch (error) {
    console.log("❌  getMigrateStudents API : ", error);
    return next(error);
  }
}

// 📝 Get all paginated migrate students
async function getAllPaginatedMigrations(req, res, next) {
  try {
    // console.log("📥 Incoming request | Query Params:", req.query);

    const page = Math.max(Number(req.query.page) || 1, 1); // always ≥ 1
    const limit = Math.max(Number(req.query.limit) || 10, 1); // always ≥ 1
    const skip = (page - 1) * limit;

    const { filterChecker, keyword, className, session, section, shift } =
      req.query;

    if (!className || !session || !section || !shift) {
      return res.status(200).json({
        success: true,
        totalPages: 0,
        currentPage: 1,
        totalEntries: 0,
        isAnyFieldMissing: true,
        data: [],
      });
    }

    const findStudentQuery =
      className && session && section && shift
        ? { className, shift, section, session }
        : null;

    const dateFilterQuery = filterChecker ? getFilteredDate(filterChecker) : {};

    const searchQuery = req.query.keyword
      ? {
          $or: [
            { admissionNumber: { $regex: keyword, $options: "i" } },
            { admissionDate: { $regex: keyword, $options: "i" } },
            { studentRoll: { $regex: keyword, $options: "i" } },
            { name: { $regex: keyword, $options: "i" } },
            { nameInBangla: { $regex: keyword, $options: "i" } },
            { birthCertificate: { $regex: keyword, $options: "i" } },
            { bloodGroup: { $regex: keyword, $options: "i" } },
            { religion: { $regex: keyword, $options: "i" } },
            { fatherName: { $regex: keyword, $options: "i" } },
            { fatherNID: { $regex: keyword, $options: "i" } },
            { fatherPhone: { $regex: keyword, $options: "i" } },
            { motherName: { $regex: keyword, $options: "i" } },
            { motherNID: { $regex: keyword, $options: "i" } },
            { motherPhone: { $regex: keyword, $options: "i" } },
            { presentAddress: { $regex: keyword, $options: "i" } },
            { permanentAddress: { $regex: keyword, $options: "i" } },
            { guardianName: { $regex: keyword, $options: "i" } },
            { guardianPhone: { $regex: keyword, $options: "i" } },
            { dateOfBirth: { $regex: keyword, $options: "i" } },
            { studentGender: { $regex: keyword, $options: "i" } },
            { studentEmail: { $regex: keyword, $options: "i" } },
            { smsStatus: { $regex: keyword, $options: "i" } },
            { registrationDate: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};
    const query = {
      $and: [findStudentQuery, searchQuery, dateFilterQuery].filter(Boolean),
    };

    // console.log("query : ", query);

    const migrateStudents = await Student.find(query)
      // .sort({ admissionNumber: 1 })
      .skip(skip)
      .limit(limit)
      .populate("className")
      .populate("shift")
      .populate("section")
      .populate("session")
      .populate("group");

    // console.log("data : ", migrateStudents);

    const totalMigratedStudents = await Student.countDocuments(query);

    const totalPages = Math.ceil(totalMigratedStudents / limit);

    // console.log("📦 Total filtered students:", totalMigratedStudents);
    // console.log("👨‍🎓 Students data:", migrateStudents.length);

    return res.status(200).json({
      success: true,
      count: migrateStudents.length,
      totalPages,
      currentPage: page,
      totalEntries: totalMigratedStudents,
      isAnyFieldMissing: false,
      data: migrateStudents,
    });
  } catch (error) {
    console.log("❌  getAllPaginatedStudents API : ", error);
    return next(error);
  }
}

// 📝 delete migration-students
async function deleteMigrationStudent(req, res, next) {
  try {
    console.log("📥 Incoming request | Query Params:", req.params);

    const { id } = req.params;

    if (!id) {
      return "❌ Student ID is required.";
    }

    const deletedItem = await Student.findByIdAndDelete(id);

    console.log("✅  Deleted student :", deletedItem);

    if (deletedItem.deletedCount === 0) {
      console.log(`⚠️ Student with ID ${id} not found or already deleted.`);
      return next(createError(404, "Student not found or already deleted."));
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted.",
      deletedItem,
    });
  } catch (error) {
    console.log("delete student error : ", error);
    return next(error);
  }
}

module.exports = {
  migrateStudent,
  getMigratedStudents,
  getAllPaginatedMigrations,
  deleteMigrationStudent,
};
