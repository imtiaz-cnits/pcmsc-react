// external imports
const mongoose = require("mongoose");

// define the schema

const studentSchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      unique: true,
      // index : true
    },

    name: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    roll: {
      type: Number,
      required: true,
    },

    className: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    groupName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    studentRoll: {
      type: Number,
      required: true,
    },

    photo: {
      type: String, // imgURL
      required: false,
    },

    // for soft delete support
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// create a model from the schema
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
