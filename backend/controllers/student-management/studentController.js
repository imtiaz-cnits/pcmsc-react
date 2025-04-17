// 📌 Student Management Controller

// 🔗 external imports
const createError = require("http-errors");

// 👉 internal imports
const Student = require("../../models/studentModel");
const getFilteredDate = require("../../utilities/dateFilter");

// 📝 do add student information
async function addStudentInfo(req, res, next) {
  try {
    console.log("📥 Received student info body: ", req.body);
    console.log("📥 Received student info image: ", req.file);

    const {
      admissionNumber,
      admissionDate,
      studentRoll,
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
      group,
    } = req.body;

    // ✅ check if already exists
    const existingStudentInfo = await Student.findOne({
      studentID: admissionNumber,
    });
    // todo
    if (existingStudentInfo) {
      return next(createError(403, "Student already exists!"));
    }

    const imageURL = `${process.env.BACKEND_URL}${process.env.PORT || 4000}/uploads/avatar/${req.file.filename}`;
    const newStudentInfo = new Student({
      studentID: admissionNumber,
      admissionNumber,
      admissionDate,
      studentRoll,
      name: studentName,
      nameInBangla: nameBangla,
      birthCertificate,
      bloodGroup,
      avatar: {
        imageURL,
        fieldname: req.file?.fieldname,
        originalname: req.file?.originalname,
        mimetype: req.file?.mimetype,
        destination: req.file?.destination,
        filename: req.file?.filename,
        path: req.file?.path,
        size: req.file?.size,
      },
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
      shift,
      section,
      session,
      group,
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
      .populate("shift")
      .populate("section")
      .populate("session")
      .populate("group");

    if (!students) {
      return next(createError(404, "Student not found!"));
    }

    const totalDocuments = await Student.countDocuments();

    // console.log("🔑 Fetched all students and count :", {count: totalDocuments , data: students});

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

// 📝 get all students (id)
async function getStudentByID(req, res, next) {
  try {
    const { id } = req.params;

    const student = await Student.findOne({ _id: id })
      .populate("className")
      .populate("shift")
      .populate("section")
      .populate("session")
      .populate("group");

    if (!student) {
      return next(createError(404, "Student not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully!",
      data: student,
    });
  } catch (error) {
    console.error("❌ Error getStudentByID ", error);

    return next(error);
  }
}

// 📝 Get all paginated students
async function getAllPaginatedStudents(req, res, next) {
  try {
    console.log("📥 Incoming request | Query Params:", req.query);
    const page = Math.max(Number(req.query.page) || 1, 1); // always ≥ 1
    const limit = Math.max(Number(req.query.limit) || 10, 1); // always ≥ 1
    const skip = (page - 1) * limit;
    const { filterChecker, keyword } = req.query;

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

    console.log(
      "📅 Applied Filter:",
      filterChecker || "none",
      "| MongoDB Query:",
      dateFilterQuery,
      "| Search Query:",
      searchQuery,
    );

    const query = { $and: [dateFilterQuery, searchQuery].filter(Boolean) };

    const students = await Student.find(query)
      .sort({ admissionNumber: -1 })
      .skip(skip)
      .limit(limit)
      .populate("className")
      .populate("shift")
      .populate("section")
      .populate("session")
      .populate("group");

    const totalFilteredStudents = await Student.countDocuments(query);

    const totalPages = Math.ceil(totalFilteredStudents / limit);

    console.log("📦 Total filtered students:", totalFilteredStudents);
    console.log("👨‍🎓 Students data:", students.length);

    if (!students || students.length === 0) {
      return next(createError(404, "No students found."));
    }

    return res.status(200).json({
      success: true,
      totalPages,
      currentPage: page,
      totalEntries: totalFilteredStudents,
      data: students,
    });
  } catch (error) {
    console.log("❌  getAllPaginatedStudents API : ", error);
    return next(error);
  }
}

// 📝 update student
async function updateStudent(req, res, next) {
  try {
    console.log(" 🚀  student params : ", req.params);
    console.log(" 🚀  student body : ", req.body);

    const { id } = req.params;
    const formData = { ...req.body };

    console.log("fordata : ", formData);

    if (req.file) {
      const imageURL = `${process.env.BACKEND_URL}${process.env.PORT || 4000}/uploads/avatar/${req.file.filename}`;
      formData.avatar = {
        imageURL,
        fieldname: req.file?.fieldname,
        originalname: req.file?.originalname,
        mimetype: req.file?.mimetype,
        destination: req.file?.destination,
        filename: req.file?.filename,
        path: req.file?.path,
        size: req.file?.size,
      };
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, formData, {
      new: true,
    });

    if (!updatedStudent) {
      return next(createError(404, "Item not found!"));
    }

    // if (payload.admissionNumber) {
    //   const existingStudent = await Student.find({
    //     studentID: payload.admissionNumber,
    //   });

    // }
    console.log("🚀 updated student : ", updatedStudent);

    return res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      updatedData: updatedStudent,
    });
  } catch (error) {
    console.error("updateStudent  error : ", error);

    return next(error);
  }
}

// 📝 delete students
async function deleteStudent(req, res, next) {
  try {
    // console.log("deleted student params ", req.params);
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
  addStudentInfo,
  getAllStudents,
  getStudentByID,
  getAllPaginatedStudents,
  updateStudent,
  deleteStudent,
};
