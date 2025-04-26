const MarkEntry = require("../../models/markEntryModel");
const Student = require("../../models/studentModel");

async function getMarkSheet(req, res, next) {
  try {
    // console.log("query params of getMarkSheet : ", req.query);
    const { roll, sectionID, classID, shiftID, sessionID, examinationID } =
      req.query;

    const reportCard = await MarkEntry.find({
      studentRoll: roll,
      className: classID,
      session: sessionID,
      shift: shiftID,
      examType: examinationID,
      section: sectionID,
    }).populate("student");

    // console.log("report card length : ", reportCard.length);
    // console.log("report card : ", reportCard);

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
    console.log("query params of getEligibleStudent : ", req.query);
    const { roll, sectionID, classID, shiftID, sessionID } = req.query;

    const eligibleStudents = await Student.find({
      studentRoll: roll,
      className: classID,
      session: sessionID,
      shift: shiftID,
      section: sectionID,
    });

    console.log("eligible Students length : ", eligibleStudents.length);
    console.log("eligible Students : ", eligibleStudents);

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

module.exports = { getMarkSheet, getEligibleStudent };
