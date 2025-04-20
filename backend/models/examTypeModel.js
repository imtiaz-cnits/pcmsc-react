const mongoose = require("mongoose");

const examTypeSchema = new mongoose.Schema({
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
    enum: ["active", "pending", "inactive"],
    default: "active",
  },
});

// create model from the schema
const ExamType = mongoose.model("ExamType", examTypeSchema);

// exports
module.exports = ExamType;
