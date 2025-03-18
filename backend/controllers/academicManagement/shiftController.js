// external imports

const Shift = require("../../models/shiftModel");

// internal imports

// 📝 do add shift
async function addShift(req, res, next) {
  try {
    const { name, status } = req.body;

    console.log("before => shift add body", req.body);

    // frontend required field check

    // 👤 create new add class object
    const newClass = new Shift({
      name,
      status,
    });
    console.log("before enter => new added shift", newClass);

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

// 📝 get all shift
async function getAllshift(req, res, next) {
  try {
    const shift = await Shift.find();

    console.log("get all shift value : ", shift);
    return res.json(200).json({
      success: true,
      data: shift,
    });
  } catch (error) {
    console.log("get all shift : ", error);
    return next(error);
  }
}

// 📝 update
async function updateShift(req, res, next) {
  try {
    return undefined;
  } catch (error) {
    console.error("update class error : ", error);
    return next(error);
  }
}

// delete
async function deleteShift(req, res, next) {
  try {
    const shiftDeleted = await Shift.deleteOne();
    console.log("shift deleted", shiftDeleted);
    return undefined;
  } catch (error) {
    console.log("delete shift error : ", error);
    return next(error);
  }
}

// module exports
module.exports = { addShift, getAllshift, updateShift, deleteShift };
