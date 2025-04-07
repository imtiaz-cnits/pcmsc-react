// external imports
const createError = require("http-errors");
const ClassModel = require("../../models/classModel");

// 📝 do add class
async function addClass(req, res, next) {
  try {
    console.log("📥 Received class data: ", req.body);

    const { name, status, label } = req.body;

    // console.log("before => class add body", req.body);

    // check if already exists
    // todo fixed !already exits or not issue
    const existingClass = await ClassModel.findOne({ name });
    const totalDocuments = await ClassModel.countDocuments();

    // documents count

    console.log("existing class : ", existingClass);
    console.log("total class documents : ", totalDocuments);
    if (existingClass) {
      return next(createError(403, "Class already exists!"));
    }

    // 👤 create new add class object
    const newClass = new ClassModel({
      name,
      nameLabel: name,
      label,
      status,
    });
    // console.log("🚀 Adding Class to DB: ", newClass);

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

    console.log("🔑 Fetched all classes:", classes);

    return res.status(200).json({
      success: true,
      message: "Classes fetched successfully!",
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    console.error("❌ Error fetching classes:", error);

    // 💬 Passing the error to the next middleware
    return next(error);
  }
}

// 📝 Get all shifts with pagination
async function getAllPaginatedClasses(req, res, next) {
  try {
    // console.log("📥 Received request for shifts: ", req.query);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const classes = await ClassModel.find({}).skip(skip).limit(limit);

    const total = await ClassModel.countDocuments();

    const totalPages = Math.ceil(total / limit);

    // console.log("✅ Retrieved class: ", classes);
    return res.status(200).json({
      success: true,
      count: classes.length,
      currentPage: page,
      totalPages,
      total,
      data: classes,
    });
  } catch (error) {
    console.error("❌ Error fetching classes: ", error);
    return next(error);
  }
}

// 📝 update
async function updateClass(req, res, next) {
  try {
    // console.log("class params : ", req.params);
    // console.log("class body : ", req.body);
    const { id: classId } = req.params;
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

    const existingClass = await ClassModel.find({ name: classData.name });

    if (existingClass) {
      return next(403, "Already exits!");
    }

    console.log("updated class value : ", updatedClass);

    return res.status(200).json({
      success: true,
      message: "Class updated successfully!",
      updatedData: updatedClass,
    });
  } catch (error) {
    console.error("update class error : ", error);
    return next(error);
  }
}

// 📝 Delete Shift
async function deleteClass(req, res, next) {
  try {
    // console.log("deleted class params ", req.params);
    const { id } = req.params;

    if (!id) {
      return "❌ Class ID is required.";
    }

    // not found
    const deletedItem = await ClassModel.findByIdAndDelete(id);

    console.log("✅ Class deleted:", deletedItem);
    if (deletedItem.deletedCount === 0) {
      console.log(`⚠️ Class with ID ${id} not found or already deleted.`);
      return next(createError(404, "Class not found or already deleted."));
    }

    return res.status(200).json({
      success: true,
      message: "Class successfully deleted.",
      deletedItem,
    });
  } catch (error) {
    console.log("delete class error : ", error);
    return next(error);
  }
}

// module exports
module.exports = {
  addClass,
  getAllClasses,
  updateClass,
  deleteClass,
  getAllPaginatedClasses,
};
