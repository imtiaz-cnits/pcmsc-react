// external imports
const mongoose = require("mongoose");

// define the schema

const studentSchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      unique: true,
    },

    admissionNumber: {
      type: String,
      unique: true,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
    },

    nameInBangla: {
      type: String,
      trim: true,
      required: true,
    },

    birthCertificate: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Other"],
      required: true,
    },

    religion: {
      type: String,
      trim: true,
      required: true,
    },

    fatherName: {
      type: String,
      trim: true,
      required: true,
    },

    fatherNID: {
      type: String,
      trim: true,
      required: true,
    },

    fatherPhone: {
      type: String,
      trim: true,
      required: true,
    },

    motherName: {
      type: String,
      trim: true,
      required: true,
    },

    motherNID: {
      type: String,
      required: true,
    },

    motherPhone: {
      type: String,
      trim: true,
      required: true,
    },

    presentAddress: {
      type: String,
      trim: true,
      required: true,
    },

    permanentAddress: {
      type: String,
      trim: true,
      required: true,
    },

    guardianName: {
      type: String,
      trim: true,
      required: true,
    },

    guardianPhone: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    studentGender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    studentEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },

    smsStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },

    registrationDate: {
      type: Date,
      required: true,
    },

    className: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    shiftName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },

    sectionName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    sessionName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    studentRoll: {
      type: Number,
      required: true,
      default: "temp-123",
    },

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
