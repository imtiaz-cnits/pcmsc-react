const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    gradeName: {
      type: String,
      required: true,
      enum: ["A+", "A", "A-", "B", "C", "D", "F"],
      uppercase: true,
      trim: true,
    },

    gradePoint: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    totalSubjectMark: {
      type: Number,
      required: true,
      default: 100,
    },
    markFrom: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    markUpTo: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
