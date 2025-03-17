// external imports

const mongoose = require("mongoose");

//  define the schema for the group

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// create a model for the schema
const Group = mongoose.model("Group", groupSchema);

// exports
module.exports = Group;
