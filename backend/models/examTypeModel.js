const mongoose = require("mongoose");

const examTypeSchema = new mongoose.Schema(
  {
    examTypeName: {
      type: String,
      trim: true,
      required: true,
    },

    label: {
      type: String,
      trim: true,
      default: "Active",
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

// create model from the schema
const ExamType = mongoose.model("ExamType", examTypeSchema);

// exports
module.exports = ExamType;
