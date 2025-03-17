// internal imports
const ClassModel = require("../models/classModel");
const Shift = require("../models/shiftModel");
const Session = require("../models/sessionModel");
const Section = require("../models/sectionModel");

// 📝 do add class
async function AddClass(req, res, next) {
  try {
    const { className, status } = req.body;

    // 👤 create new add class object
    const newClass = new ClassModel({
      name: className.trim(),
      status,
    });
    console.log("new added class", newClass);

    // 💾 Save the user to the database
    await newClass.save();

    // 🎉 Success response
    return res.status(200).json({
      success: true,
      message: "Successfully added!",
    });
  } catch (error) {
    console.log("Error in adding class: ", error);
    return next(error);
  }
}

// 📝 do add shift
async function AddShift(req, res, next) {
  const { shift, status } = req.body;
  try {
    // 👤 Create new shift object
    const newShift = new Shift({
      name: shift.trim(),
      status: status?.value,
    });

    // 💾 Save the user to the database
    await newShift.save();

    // 🎉 Success response
    return res.status(200).json({
      success: true,
      message: "Successfully added!",
    });
  } catch (error) {
    console.log("Error in adding shift: ", error);
    return next(error);
  }
}

// 📝 do add section
async function AddSection(req, res, next) {
  const { section, status } = req.body;

  try {
    // create new object
    const newSection = new Section({
      name: section.trim(),
      status: status?.value,
    });

    // save to db
    await newSection.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
    });
  } catch (error) {
    console.log("Error in adding section: ", error);
    return next(error);
  }
}

// 📝 do add session
async function AddSession(req, res, next) {
  const { session, status } = req.body;

  try {
    // 👤 Create new session object
    const newSession = new Session({
      year: session,
      status: status?.value,
    });

    // 💾 Save the user to the database
    await newSession.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
    });
  } catch (error) {
    console.log("Error in adding session: ", error);
    return next(error);
  }
}

// exports
module.exports = { AddClass, AddShift, AddSection, AddSession };
