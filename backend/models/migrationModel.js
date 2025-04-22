const mongoose = require("mongoose");

const studentMigrationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      trim: true,
      required: true,
    },

    registrationDate: {
      type: String,
      required: true,
    },

    classRoll: {
      type: String,
      default: "",
    },

    className: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
  },
  { timestamps: true },
);

// create a model from the schema
const MigrateStudent = mongoose.model("Migration", studentMigrationSchema);

module.exports = MigrateStudent;
