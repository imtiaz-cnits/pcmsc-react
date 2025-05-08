const { ObjectId } = require("mongoose").Types;
const MarkEntry = require("../../models/markEntryModel");

async function getGenaratedAdmitCard(req, res, next) {
  try {
    console.log("query : ", req.query);

    const { studentRoll, classID, sessionID, sectionID, shiftID } = req.query;

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

    const filters = studentRoll
      ? {
          studentRoll,
          className: new ObjectId(classID),
          section: new ObjectId(sectionID),
          session: new ObjectId(sessionID),
          shift: new ObjectId(shiftID),
        }
      : {
          className: new ObjectId(classID),
          section: new ObjectId(sectionID),
          session: new ObjectId(sessionID),
          shift: new ObjectId(shiftID),
        };

    const admitCards = await MarkEntry.aggregate([
      { $match: filters },

      {
        $group: {
          _id: "$studentID",
          student: { $first: "$student" },
          session: { $first: "$session" },
          examType: { $first: "$examType" },
        },
      },

      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "groups",
          localField: "student.group",
          foreignField: "_id",
          as: "student.group",
        },
      },
      { $unwind: { path: "$student.group", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "sessions",
          localField: "session",
          foreignField: "_id",
          as: "session",
        },
      },
      {
        $unwind: { path: "$session", preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: "examtypes",
          localField: "examType",
          foreignField: "_id",
          as: "examType",
        },
      },
      { $unwind: { path: "$examType", preserveNullAndEmptyArrays: true } },
      { $sort: { "student.studentRoll": 1 } },
      {
        $project: {
          examineName: "$student.name",
          rollNo: "$student.studentRoll",
          fatherName: "$student.fatherName",
          motherName: "$student.motherName",
          regNo: "$student.admissionNumber",
          exmType: "$examType.examTypeName",
          session: "$session.nameLabel",
          group: "$student.group.nameLabel",
        },
      },
    ]);

    const total = await MarkEntry.countDocuments(filters);

    return res.status(200).json({
      success: true,
      message: "Admit Card fetch successfully !.",
      count: admitCards.length,
      totalEntries: total,
      data: admitCards,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getGenaratedAdmitCard };
