const mongoose = require("mongoose");

const examAssignSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      trim: true,
      required: true,
    },

    examName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamType",
      required: true,
    },

    className: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    examDate: {
      type: String,
      required: true,
    },

    resultDateTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ExamAssign = mongoose.model("ExamAssign", examAssignSchema);

module.exports = ExamAssign;
