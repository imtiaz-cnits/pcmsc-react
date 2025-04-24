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
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

// pre calculate
markEntrySchema.pre("save", function cal(next) {
  this.total = this.writtenMark + this.oralMark;
  next();
});

const MarkEntry = mongoose.model("MarkEntry", markEntrySchema);

module.exports = MarkEntry;
