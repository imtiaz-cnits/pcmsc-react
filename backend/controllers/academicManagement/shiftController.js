// external imports

const createError = require("http-errors");
const Shift = require("../../models/shiftModel");

// internal imports

// 📝 do add shift
async function addShift(req, res, next) {
  try {
    const { shift: name, status } = req.body;

    console.log("before => shift add body", req.body);

    // frontend required field check
    if (!name || name.trim() === "") {
      return next(
        createError(400, "Shift name is required and cannot be empty"),
      );
    }

    // check if already exists

    const existingShift = await Shift.findOne({ name, status });

    if (existingShift) {
      return next(createError(400, "Shift already exists!"));
    }

    // 👤 create new add class object
    const newClass = new Shift({
      name,
      status,
    });
    console.log("before enter to db => new added shift", newClass);

    // 💾 Save the user to the database
    await newClass.save();

    // 🎉 Success response
    return res.status(200).json({
      success: true,
      message: "Successfully added!",
    });
  } catch (error) {
    console.log("Error in adding class: ", error);
    console.log("error statuses code ", error.status);
    // Handle duplicate key error for unique fields (custom error)

    // Handle duplicate key error (code 11000)
    if (error.code === 11000) {
      return next(
        createError(
          400,
          "Shift already exists! Please choose a different name.",
        ),
      );
    }
    // ⚠️ Handle unexpected errors (fallback)
    return next(error);
  }
}

// 📝 get all shift
async function getAllShift(req, res, next) {
  try {
    const shifts = await Shift.find();

    if (!shifts) {
      return next(createError(400, "Shift not found"));
    }

    console.log("get all shift value : ", shifts);

    return res.status(200).json({
      success: true,
      data: shifts,
    });
  } catch (error) {
    console.log("get all shift : ", error);
    return next(error);
  }
}

// 📝 Get all shifts with pagination
async function getAllShiftsPagination(req, res, next) {
  try {
    console.log("📥 Received request for shifts: ", req.query);

    const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
    const skip = Math.max(parseInt(req.query.skip, 10) || 0, 0);

    const shifts = await Shift.find({}).skip(skip).limit(limit);

    const total = await Shift.countDocuments();

    if (!shifts.length) {
      console.warn("⚠️ No shifts found");
      return res.status(404).json({
        success: false,
        message: "No shifts found",
      });
    }

    // console.log("✅ Retrieved shifts: ", shifts);
    return res.status(200).json({
      success: true,
      count: shifts.length,
      data: shifts,
      total,
    });
  } catch (error) {
    // console.error("❌ Error fetching shifts: ", error);
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
    console.log("deleted shift params ", req.params);

    const { id } = req.params;

    if (!id) {
      return next(createError(404, "❌ Shift ID is required."));
    }

    const shiftDeleted = await Shift.findByIdAndDelete(id);

    console.log("✅ Shift deleted:", shiftDeleted);

    if (!shiftDeleted) {
      return next(createError(400, "⚠️ Shift not found or already deleted."));
    }

    return res.status(200).json({
      success: true,
      message: "Shift successfully deleted.",
      deletedShift: shiftDeleted,
    });
  } catch (error) {
    console.log("delete shift error : ", error);
    return next(error);
  }
}

// module exports
module.exports = {
  addShift,
  getAllShift,
  getAllShiftsPagination,
  updateShift,
  deleteShift,
};
