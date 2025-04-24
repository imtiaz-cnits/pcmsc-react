const Student = require("../../models/studentModel");

async function searchEligibleStudents(req, res, next) {
  try {
    console.log("payloads ", req.query);

    const { className, session, section, shift } = req.query;

    const query = { className, session, section, shift };

    const students = await Student.find(query).sort({ studentRoll: 1 });

    const totalEntries = await Student.countDocuments(query);

    console.log("studens data : ", students);

    return res.status(200).json({
      success: true,
      totalEntries,
      message: "Students Fetched Successfully !",
      data: students,
    });
  } catch (error) {
    console.log(" error in searchEligibleStudents ", error);
    return next(error);
  }
}

module.exports = { searchEligibleStudents };
