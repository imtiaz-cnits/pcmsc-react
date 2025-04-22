// external imports

const createError = require("http-errors");
const Shift = require("../../models/shiftModel");

// internal imports

// 📝 do add shift
async function addShift(req, res, next) {
  try {
    console.log("📥 Received shift data: ", req.body);

    const { name, status, label } = req.body;

    // frontend required field check
    // if (!name || name.trim() === "") {
    //   return "Shift name is required and cannot be empty";
    // }

    // check if already exists

    const existingShift = await Shift.findOne({ name });
    const totaldocuments = await Shift.countDocuments();

    console.log("existing shift : ", existingShift);
    console.log("total documents : ", totaldocuments);
    if (existingShift) {
      return next(createError(403, "Shift already exists!"));
    }

    // 👤 create new add class object
    const newShift = new Shift({
      name,
      nameLabel: name,
      label,
      status,
    });
    console.log("🛠️ Preparing to save shift:", newShift);

    // 💾 Save the user to the database
    await newShift.save();

    console.log("✅ [Shift] Successfully added:", newShift);

    // 🎉 Success response
    return res.status(200).json({
      success: true,
      message: "Shift added successfully!",
    });
  } catch (error) {
    console.log("Error in adding class: ", error);
    console.log("error statuses code ", error.status);
    // Handle duplicate key error for unique fields (custom error)

    // custom Mongoose Error
    if (error.name === "ValidationError") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    // MongoServerError
    if (error.name === "MongoServerError") {
      if (error.errorResponse.code === 11000) {
        return res.status(403).json({
          success: false,
          error: "MongoServerError",
          message: "Session already exists!",
        });
      }
    }
    // ⚠️ Handle unexpected errors (fallback)
    return next(error);
  }
}

// 📝 get all shift
async function getAllShift(req, res, next) {
  try {
    const shifts = await Shift.find({});

    // console.log("shifts : ", shifts);

    if (!shifts) {
      return next(createError(404, "Shift not found"));
    }

    // console.log("🔑 Fetched all shifts :", shifts);

    return res.status(200).json({
      success: true,
      message: "Shifts fetched successfully!",
      count: shifts.length,
      data: shifts,
    });
  } catch (error) {
    console.log("get all shifts : ", error);
    return next(error);
  }
}

// 📝 Get all shifts with pagination
async function getAllShiftsPagination(req, res, next) {
  try {
    // console.log("📥 Received request for shifts: ", req.query);

    // const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
    // const skip = Math.max(parseInt(req.query.skip, 10) || 0, 0);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const shifts = await Shift.find({}).skip(skip).limit(limit);

    const total = await Shift.countDocuments();

    const totalPages = Math.ceil(total / limit);

    // if (total <= 0) {
    //   console.log("⚠️ No shifts found");
    //   return res.status(404).json({
    //     success: false,
    //     message: "No shifts found",
    //     currentPage: page,
    //     totalPages,
    //     total,
    //   });
    // }

    console.log("✅ Retrieved shifts: ", shifts);
    return res.status(200).json({
      success: true,
      count: shifts.length,
      currentPage: page,
      totalPages,
      total,
      data: shifts,
    });
  } catch (error) {
    console.error("❌ Error fetching shifts: ", error);
    return next(error);
  }
}

// 📝 Get all shifts with entries
async function getAllShiftsEntries(req, res, next) {
  try {
    // console.log("entries value :", req.query);
    const entries = parseInt(req.query.limit, 10);

    // console.log("entries value and tyeof : ", entries, typeof entries);

    const entriesValue = await Shift.find({}).limit(entries);

    const totalEntries = await Shift.countDocuments();

    if (totalEntries < 1) {
      return next(createError(403, "not found"));
    }

    return res.status(200).json({
      success: true,
      totalEntries,
      data: entriesValue,
    });
  } catch (error) {
    console.log("entries error : ", error);
    return next(error);
  }
}

// 📝 Update Shift
async function updateShift(req, res, next) {
  try {
    // console.log("shift params : ", req.params);
    const { id: shiftId } = req.params;
    const { shift, label, status } = req.body;

    // console.log(`🔄 Updating section [ID: ${shiftId}] with data:`, req.body);

    // updated payload
    const updatePayload = {
      name: shift,
      label,
      status,
    };

    // console.log(
    //   `🔄 Before => Updating shift [ID: ${shiftId}] with data:`,
    //   updatePayload,
    // );

    const updatedShift = await Shift.findByIdAndUpdate(shiftId, updatePayload, {
      new: true,
    });

    if (!updatedShift) {
      console.warn(`⚠️ Shift not found [ID: ${shiftId}]`);
      return next(createError(404, "Shift not found!"));
    }

    // console.log("✅ Successfully updated shift:", updatedShift);

    return res.status(200).json({
      success: true,
      message: "Shift updated successfully!",
      data: updatedShift, // ✅ Use `data` instead of `updatedData` for consistency
    });
  } catch (error) {
    console.error("❌ Error updating shift:", error);
    return next(error);
  }
}

// delete
async function deleteShift(req, res, next) {
  try {
    console.log("deleted shift params ", req.params);

    const { id } = req.params;

    if (!id) {
      return "❌ Shift ID is required.";
    }

    const shiftDeleted = await Shift.findByIdAndDelete(id);

    // console.log("✅ Shift deleted:", shiftDeleted);

    if (shiftDeleted.deletedCount === 0) {
      // console.log(`⚠️ Shift with ID ${id} not found or already deleted.`);
      return next(createError(404, "Shift not found or already deleted."));
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

// ✅  module exports
module.exports = {
  addShift,
  getAllShift,
  getAllShiftsPagination,
  updateShift,
  deleteShift,
  getAllShiftsEntries,
};
