const { ObjectId } = require("mongoose").Types;
const MarkEntry = require("../../models/markEntryModel");

async function getGTBSheet(req, res, next) {
  try {
    const { classID, sessionID, sectionID, shiftID } = req.query;

    if (
      !ObjectId.isValid(classID) ||
      !ObjectId.isValid(sessionID) ||
      !ObjectId.isValid(sectionID) ||
      !ObjectId.isValid(shiftID)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid filter parameters",
      });
    }

    const filters = {
      className: new ObjectId(classID),
      section: new ObjectId(sectionID),
      session: new ObjectId(sessionID),
      shift: new ObjectId(shiftID),
    };

    const markEntries = await MarkEntry.find(filters)
      .populate("subject", "name") // Assuming subject collection has 'name' field
      .populate("student", "name studentRoll") // Assuming student collection has 'name' and 'studentRoll'
      .lean();

    const reportCard = markEntries.reduce((acc, entry) => {
      const {
        student,
        studentName,
        studentRoll,
        studentID,
        subject,
        mcqMark,
        writtenMark,
        caMark,
        ctMark,
        totalMark,
        gradePoint,
        letterGrade,
      } = entry;

      // Find or create student entry in accumulator
      let studentEntry = acc.find((item) => item.studentID === studentID);
      if (!studentEntry) {
        studentEntry = {
          studentID,
          studentName: studentName || student?.name,
          studentRoll: studentRoll || student?.studentRoll,
          subjects: [],
          totalMarks: 0,
        };
        acc.push(studentEntry);
      }

      // Add subject details
      studentEntry.subjects.push({
        subjectID: subject._id,
        subjectName: subject.name,
        mcqMark,
        writtenMark,
        caMark,
        ctMark,
        totalMark,
        gradePoint,
        letterGrade,
      });

      // Update total marks
      studentEntry.totalMarks += totalMark;

      return acc;
    }, []);

    reportCard.sort((a, b) => a.studentRoll.localeCompare(b.studentRoll));

    console.log("data of gtb : ", reportCard);

    const totalEntries = await MarkEntry.countDocuments();

    return res.status(200).json({
      success: true,
      message: "GTBs Sheet fetch successfully !.",
      count: reportCard.length,
      totalEntries,
      data: reportCard,
    });
  } catch (error) {
    console.log("error : getGTBSheet ", error);
    return next(error);
  }
}

module.exports = { getGTBSheet };
