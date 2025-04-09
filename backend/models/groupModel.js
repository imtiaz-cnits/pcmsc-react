// external imports

const mongoose = require("mongoose");

//  define the schema for the group

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    nameLabel: {
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
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

// create a model for the schema
const Group = mongoose.model("Group", groupSchema);

// exports
module.exports = Group;
