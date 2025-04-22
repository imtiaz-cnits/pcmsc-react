const createError = require("http-errors");

// 👉 internal imports
const Student = require("../../models/studentModel");
const MigrateStudent = require("../../models/migrationModel");

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

// 📝 Get all paginated students
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

module.exports = { migrateStudent, getMigratedStudents };
