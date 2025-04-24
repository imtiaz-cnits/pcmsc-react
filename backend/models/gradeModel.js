const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    gradeName: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    gradePoint: {
      type: Number,
      required: true,
    },
    totalSubjectMark: {
      type: Number,
      required: true,
      default: 100,
    },
    markFrom: {
      type: Number,
      required: true,
    },
    markUpTo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
