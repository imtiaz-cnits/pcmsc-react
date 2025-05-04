const { ObjectId } = require("mongoose").Types;
const MarkEntry = require("../../models/markEntryModel");
const Student = require("../../models/studentModel");

async function getMarkSheet(req, res, next) {
  try {
    const { roll, sectionID, classID, shiftID, sessionID, examinationID } =
      req.query;

    const reportCard = await MarkEntry.find({
      studentRoll: roll,
      className: classID,
      session: sessionID,
      shift: shiftID,
      examType: examinationID,
      section: sectionID,
    }).populate("student className session section shift subject examType");

    const totalEntries = await MarkEntry.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Mark Sheet fetch successfully !.",
      count: reportCard.length,
      totalEntries,
      data: reportCard,
    });
  } catch (error) {
    console.log("error : getMarkSheet ", error);
    return next(error);
  }
}

async function getEligibleStudent(req, res, next) {
  try {
    // console.log("query params of getEligibleStudent : ", req.query);
    const { roll, sectionID, classID, shiftID, sessionID } = req.query;

    const eligibleStudents = await Student.find({
      studentRoll: roll,
      className: classID,
      session: sessionID,
      shift: shiftID,
      section: sectionID,
    }).populate("shift section session group className");

    // console.log("eligible Students length : ", eligibleStudents.length);
    // console.log("eligible Students : ", eligibleStudents);

    const totalEntries = await MarkEntry.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Mark Sheet Eligible Student fetch successfully !.",
      count: eligibleStudents.length,
      totalEntries,
      data: eligibleStudents,
    });
  } catch (error) {
    console.log("error : getEligibleStudent ", error);
    return next(error);
  }
}

async function getHighestMark(req, res, next) {
  try {
    const { classID, sectionID, sessionID, shiftID, examinationID } = req.query;

    console.log("query :", req.query);
    const filters = {
      className: new ObjectId(classID),
      section: new ObjectId(sectionID),
      session: new ObjectId(sessionID),
      shift: new ObjectId(shiftID),
      examType: new ObjectId(examinationID),
    };

    console.log("filters ", filters);

    const highestMarks = await MarkEntry.aggregate([
      { $match: filters },
      {
        $group: {
          _id: "$subject",
          maxMark: { $max: "$totalMark" },
          student: { $first: "$student" },
          studentName: { $first: "$studentName" },
          studentRoll: { $first: "$studentRoll" },
          studentID: { $first: "$studentID" },
        },
      },
      // Populate subject details
      {
        $lookup: {
          from: "subjects",
          localField: "_id",
          foreignField: "_id",
          as: "subject",
        },
      },
      { $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
      // Populate other fields if needed
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
      // Project only required fields
      {
        $project: {
          subject: {
            subjectName: "$subject.subjectName",
            subjectCode: "$subject.subjectCode",
            _id: "$subject._id",
          },
          maxMark: 1,
          studentName: 1,
          studentRoll: 1,
          studentID: 1,
        },
      },
    ]);

    console.log("highestmark : ", highestMarks);

    const totalEntries = await MarkEntry.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Highest Mark fetch successfully !.",
      count: highestMarks.length,
      totalEntries,
      data: highestMarks,
    });
  } catch (error) {
    console.log("error : getHighestMark ", error);
    return next(error);
  }
}

module.exports = { getMarkSheet, getEligibleStudent, getHighestMark };
