const mongoose = require("mongoose");
const createError = require("http-errors");
const Section = require("../../models/sectionModel");

// 📝 do add Section
async function addSection(req, res, next) {
  try {
    console.log("📥 Received section data: ", req.body);

    const { name, status, label } = req.body;

    // check if already exists

    const existingSection = await Section.findOne({ name });
    const totalDocuments = await Section.countDocuments();

    console.log(
      "existing section and total documents  : ",
      existingSection,
      totalDocuments,
    );
    if (existingSection) {
      return next(createError(403, "Section already exists!"));
    }

    // 👤 create new add class object
    const newSection = new Section({
      name,
      nameLabel: name.charAt(0).toUpperCase() + name.slice(1),
      label,
      status,
    });
    console.log("🛠️ Preparing to save section:", newSection);

    // 💾 Save the user to the database
    await newSection.save();

    console.log("✅ [Section] Successfully added:", newSection);

    // 🎉 Success response
    return res.status(200).json({
      success: true,
      message: "Section added successfully!",
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
          message: "Section already exists!",
        });
      }
    }
    // ⚠️ Handle unexpected errors (fallback)
    return next(error);
  }
}

// 📝 Get all shifts
async function getAllSections(req, res, next) {
  try {
    const sections = await Section.find({});
    const totalDocuments = await Section.countDocuments();

    if (!sections) {
      return next(createError(404, "Sections not foudn!"));
    }

    return res.status(200).json({
      success: true,
      message: "Classes fetched successfully!",
      count: totalDocuments,
      data: sections,
    });
  } catch (error) {
    console.error("❌ Error fetching sections:", error);
    return next(error);
  }
}

// 📝 Get all shifts with pagination
async function getAllPaginatedSections(req, res, next) {
  try {
    console.log("📥 Received request for sections: ", req.query);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const { keyword } = req.query;
    const searchQuery = req.query.keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { nameLabel: { $regex: keyword, $options: "i" } },
            { label: { $regex: keyword, $options: "i" } },
            { status: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const sections = await Section.find(searchQuery).skip(skip).limit(limit);

    const total = await Section.countDocuments();

    const totalPages = Math.ceil(total / limit);

    console.log("✅ Retrieved shifts: ", sections);
    return res.status(200).json({
      success: true,
      count: sections.length,
      currentPage: page,
      totalPages,
      totalEntries: total,
      data: sections,
    });
  } catch (error) {
    console.error("❌ Error fetching shifts: ", error);
    return next(error);
  }
}

// 📝 Update Shift
async function updateSection(req, res, next) {
  try {
    console.log("section params : ", req.params);
    console.log("section body : ", req.body);
    const { id } = req.params;
    const { name, label, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid grade type ID."));
    }

    // updated payload
    const payload = {
      name,
      nameLabel: name,
      label: label || "Active",
      status: status || "active",
    };

    const existingItem = await Section.findOne({
      name: payload.name,
      _id: { $ne: id },
    });

    if (existingItem) {
      return next(createError(403, "Already Exists!"));
    }

    const updatedSection = await Section.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Section updated successfully!",
      data: updatedSection,
    });
  } catch (error) {
    console.error("❌ Error updating section:", error);
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
          message: "Section already exists!",
        });
      }
    }
    return next(error);
  }
}

// delete
async function deleteSection(req, res, next) {
  try {
    console.log("deleted section params ", req.params);

    const { id } = req.params;

    if (!id) {
      return "❌ Section ID is required.";
    }

    const sectionDeleted = await Section.findByIdAndDelete(id);

    console.log("✅ Section deleted:", sectionDeleted);

    if (sectionDeleted.deletedCount === 0) {
      console.log(`⚠️ Section with ID ${id} not found or already deleted.`);
      return next(createError(404, "Section not found or already deleted."));
    }

    return res.status(200).json({
      success: true,
      message: "Section successfully deleted.",
      deletedSection: sectionDeleted,
    });
  } catch (error) {
    console.log("delete section error : ", error);
    return next(error);
  }
}

// module exports
module.exports = {
  addSection,
  getAllSections,
  getAllPaginatedSections,
  updateSection,
  deleteSection,
};
