const MarkEntry = require("../../models/markEntryModel");
const Student = require("../../models/studentModel");

async function searchEligibleStudents(req, res, next) {
  try {
    // console.log("payloads ", req.query);

    const { className, session, section, shift } = req.query;

    const query = { className, session, section, shift };

    const students = await Student.find(query).sort({ studentRoll: 1 });

    const totalEntries = await Student.countDocuments(query);

    // console.log("studens data : ", students);

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

// 📝 do entry marks
async function markEntry(req, res, next) {
  try {
    console.log("payloads ", req.body);

    const payloads = req.body;

    console.log("payloads : ", payloads);

    // const insertedDocs = await MarkEntry.insertMany(req.body);

    // console.log("inserted doc ", insertedDocs);

    // console.log(`✅ Inserted ${insertedDocs.length} documents successfully.`);

    const operations = payloads.map((student) => ({
      updateOne: {
        filter: {
          student: student.student,
          studentID: student.studentID,
          studentName: student.studentName,
          studentRoll: student.studentRoll,
          className: student.className,
          session: student.session,
          section: student.section,
          shift: student.shift,
          subject: student.subject,
          examType: student.examType,
        },

        update: {
          $set: {
            mcqMark: student.mcqMark,
            writtenMark: student.writtenMark,
            caMark: student.caMark,
            ctMark: student.ctMark,
            totalMark: student.totalMark,
            letterGrade: student.letterGrade,
            gradePoint: student.gradePoint,
          },
        },
        upsert: true,
      },
    }));

    const insertedDocs = await MarkEntry.bulkWrite(operations);

    console.log("inserted doc ", insertedDocs);

    console.log(`✅ Inserted ${insertedDocs.length} documents successfully.`);

    return res.status(200).json({
      success: true,
      message: "All marks have been saved for ",
      totalEntries: insertedDocs.length,
      data: insertedDocs,
    });
  } catch (error) {
    console.log(" ❌ Error in markEntry : ", error);

    return next(error);
  }
}

async function fetchEntryMark(req, res, next) {
  try {
    const marks = await MarkEntry.find({});
    const totalEntries = await MarkEntry.countDocuments();

    return res.status(200).json({
      success: true,
      message: "fetch successfully",
      totalEntries,
      data: marks,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { searchEligibleStudents, markEntry, fetchEntryMark };
