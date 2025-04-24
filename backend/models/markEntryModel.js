const mongoose = require("mongoose");

const markEntrySchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    studentName: {
      type: String,
      trim: true,
      required: true,
    },

    studentRoll: {
      type: String,
      trim: true,
      required: true,
    },

    className: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    examType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamType",
      required: true,
    },

    writtenMark: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    oralMark: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    totalMark: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

const MarkEntry = mongoose.model("MarkEntry", markEntrySchema);

module.exports = MarkEntry;
