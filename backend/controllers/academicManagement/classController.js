// external imports
const createError = require("http-errors");
const ClassModel = require("../../models/classModel");

// 📝 do add class
async function addClass(req, res, next) {
  try {
    console.log("📥 Received class data: ", req.body);

    const { className: name, status, label } = req.body;

    console.log("before => shift add body", req.body);

    // check if already exists
    const existingClass = await ClassModel.findOne({ name });
    const totaldocuments = await ClassModel.countDocuments();

    // documents count

    console.log("existing shift : ", existingClass);
    console.log("total class documents : ", totaldocuments);
    if (existingClass || totaldocuments === 0) {
      return next(createError(403, "Class already exists!"));
    }

    // 👤 create new add class object
    const newClass = new ClassModel({
      name,
      label,
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
          message: "Class already exists!",
        });
      }
    }

    // ⚠️ Handle unexpected errors (fallback)
    return next(error);
  }
}

// 📝 get all classes
async function getAllClasses(req, res, next) {
  try {
    const classes = await ClassModel.find();

    if (!classes) {
      return next(createError(404, "Class not found!"));
    }

    // 🔍 Logging for debugging purposes
    console.log("🔑 Fetched all classes:", classes);

    return res.status(200).json({
      success: true,
      message: "Classes fetched successfully! 🎉",
      data: classes,
    });
  } catch (error) {
    console.error("❌ Error fetching classes:", error);

    // 💬 Passing the error to the next middleware
    return next(error);
  }
}

// 📝 Get all shifts with pagination

// 📝 update
async function updateClass(req, res, next) {
  try {
    const { classId } = req.params;
    const classData = req.body;

    // find and update the class document by ID

    const updatedClass = await ClassModel.findByIdAndUpdate(
      classId,
      classData,
      { new: true, runValidators: true },
    );

    if (!updatedClass) {
      return next(createError(404, "Class not found!"));
    }

    console.log("updated class value : ", updatedClass);

    return res.status(200).json({
      success: true,
      message: "Class updated successfully! 🎉",
      updatedData: updatedClass,
    });
  } catch (error) {
    console.error("update class error : ", error);
    return next(error);
  }
}

// delete
async function deleteClass(req, res, next) {
  try {
    console.log("deleted id : ", req.params);
    const { id: classId } = req.params;

    // 🔍 Find the class by ID before deleting it
    const classToDelete = await ClassModel.findById(classId);

    if (!classToDelete) {
      return next(404, "Class not found!");
    }

    // 🔍 Find the class by ID and delete it
    const classDeleted = await ClassModel.deleteOne({ _id: classId });

    console.log("deleted class  : ", classDeleted);

    if (classDeleted.deletedCount === 0) {
      return next(createError(404, "Class not found!"));
    }

    // send the response with the deleted data

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully! 🗑️🎉",
      deletedItem: classToDelete,
    });
  } catch (error) {
    console.log("delete class error : ", error);
    return next(error);
  }
}

// module exports
module.exports = { addClass, getAllClasses, updateClass, deleteClass };
