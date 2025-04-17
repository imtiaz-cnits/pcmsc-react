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
      type: String,
      required: true,
    },
    studentRoll: {
      type: String,
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

    avatar: {
      imageURL: { type: String },
      fieldname: { type: String },
      originalname: { type: String },
      mimetype: { type: String },
      destination: { type: String },
      filename: { type: String },
      path: { type: String },
      size: { type: Number },
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
      type: String,
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
      type: String,
      required: true,
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
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
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
