// 📌 Student Management Controller

// 🔗 external imports
const createError = require("http-errors");

// 👉 internal imports
const Student = require("../../models/studentModel");

// 📝 do add student information
async function addStudentInfo(req, res, next) {
  try {
    console.log("📥 Received student info body: ", req.body);

    const {
      admissionNumber,
      admissionDate,
      studentName,
      nameBangla,
      birthCertificate,
      bloodGroup,
      religion,
      fatherName,
      fatherNID,
      fatherPhoneNo,
      motherName,
      motherNID,
      motherPhoneNo,
      presentAddress,
      permanentAddress,
      guardian,
      guardianPhone,
      dob,
      studentGender,
      studentEmail,
      smsStatus,
      registrationDate,
      className,
      shift,
      section,
      session,
    } = req.body;

    // ✅ check if already exists
    const existingStudentInfo = await Student.findOne({
      studentID: admissionNumber,
    });

    if (existingStudentInfo) {
      return next(createError(403, "Student already exists!"));
    }

    const newStudentInfo = new Student({
      studentID: admissionNumber,
      admissionNumber,
      admissionDate,
      name: studentName,
      nameInBangla: nameBangla,
      birthCertificate,
      bloodGroup,
      religion,
      fatherName,
      fatherNID,
      fatherPhone: fatherPhoneNo,
      motherName,
      motherNID,
      motherPhone: motherPhoneNo,
      presentAddress,
      permanentAddress,
      guardianName: guardian,
      guardianPhone,
      dateOfBirth: dob,
      studentGender,
      studentEmail,
      smsStatus,
      registrationDate,
      className,
      shiftName: shift,
      sectionName: section,
      sessionName: session,
    });

    console.log("🚀  Adding Student Info into DB : ", newStudentInfo);

    // 💾 Save the s_info to the database
    await newStudentInfo.save();

    return res.status(200).json({
      success: true,
      message: "Student added successfully.",
      data: newStudentInfo,
    });
  } catch (error) {
    console.log("Error in adding student information : ", error);

    // custom Mongoose Error
    if (error.name === "ValidationError") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    // MongoServerError
    if (error.name === "MongoServerError") {
      if (error.errorResponse.code === 11000) {
        return res.status(403).json({
          success: false,
          error: "MongoServerError",
          message: "Student already exists!",
        });
      }
    }
    return next(error);
  }
}

// 📝 get all students
async function getAllStudents(req, res, next) {
  try {
    const students = await Student.find({})
      .populate("className")
      .populate("shiftName")
      .populate("sectionName")
      .populate("sessionName");

    const totalDocuments = await Student.countDocuments();

    return res.status(200).json({
      success: true,
      count: totalDocuments,
      data: students,
    });
  } catch (error) {
    console.error("❌ Error fetching students ", error);
    return next(error);
  }
}

module.exports = { addStudentInfo, getAllStudents };
