const MarkEntry = require("../../models/markEntryModel");

async function getMarkSheet(req, res, next) {
  try {
    console.log("query params of getMarkSheet : ", req.query);
    const { roll, sectionID, classID, shiftID, sessionID, examinationID } =
      req.query;

    const reportCard = await MarkEntry.find({ studentRoll: "1001" });

    console.log({
      studentRoll: roll,
      section: sectionID,
      className: classID,
      shift: shiftID,
      session: sessionID,
      examType: examinationID,
    });

    console.log("report card : ", reportCard);

    const totalEntries = await MarkEntry.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Mark Sheet fetch successfully !.",
      totalEntries,
      data: reportCard,
    });
  } catch (error) {
    console.log("error : getMarkSheet ", error);
    return next(error);
  }
}

module.exports = { getMarkSheet };
