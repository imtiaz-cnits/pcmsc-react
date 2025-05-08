const { ObjectId } = require("mongoose").Types;
const MarkEntry = require("../../models/markEntryModel");

function getLetterGrade(gradePoint) {
  if (gradePoint >= 5.0) return "A+";
  if (gradePoint >= 4.0) return "A";
  if (gradePoint >= 3.5) return "A-";
  if (gradePoint >= 3.0) return "B";
  if (gradePoint >= 2.0) return "C";
  return "F";
}

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
      .populate("subject", "subjectName")
      .populate("student", "name studentRoll")
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

      let studentEntry = acc.find((item) => item.studentID === studentID);
      if (!studentEntry) {
        studentEntry = {
          studentID,
          studentName: studentName || student?.name,
          studentRoll: studentRoll || student?.studentRoll,
          subjects: [],
          totalMarks: 0,
          totalGradePoints: 0,
          subjectCount: 0,
        };
        acc.push(studentEntry);
      }

      studentEntry.subjects.push({
        subjectID: subject._id,
        subjectName: subject.subjectName,
        mcqMark,
        writtenMark,
        caMark,
        ctMark,
        totalMark,
        gradePoint: parseFloat(gradePoint),
        letterGrade,
      });

      studentEntry.totalMarks += totalMark;
      studentEntry.totalGradePoints += parseFloat(gradePoint);
      studentEntry.subjectCount += 1;

      return acc;
    }, []);

    const subjectMap = new Map();
    const finalReportCard = reportCard.map((student) => {
      student.subjects.forEach((sub) => {
        if (!subjectMap.has(sub.subjectID.toString())) {
          subjectMap.set(sub.subjectID.toString(), {
            id: sub.subjectID,
            name: sub.subjectName,
          });
        }
      });

      const avgGradePoint =
        student.subjectCount > 0
          ? student.totalGradePoints / student.subjectCount
          : 0;

      const finalGradePoint = avgGradePoint.toFixed(2);
      const finalLetterGrade = getLetterGrade(finalGradePoint);

      return {
        ...student,
        finalGradePoint,
        finalLetterGrade,
      };
    });

    const subjectList = Array.from(subjectMap.values());

    finalReportCard.sort((a, b) => a.studentRoll.localeCompare(b.studentRoll));

    const totalEntries = await MarkEntry.countDocuments();

    return res.status(200).json({
      success: true,
      message: "GTBs Sheet fetch successfully !.",
      count: finalReportCard.length,
      totalEntries,
      subjectList,
      data: finalReportCard,
    });
  } catch (error) {
    console.log("error : getGTBSheet ", error);
    return next(error);
  }
}

module.exports = { getGTBSheet };
