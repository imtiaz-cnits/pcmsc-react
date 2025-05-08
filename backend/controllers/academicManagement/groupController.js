const mongoose = require("mongoose");
const createError = require("http-errors");
const Group = require("../../models/groupModel");

// 📝 do add group
async function addGroup(req, res, next) {
  try {
    console.log("📥 Received group data: ", req.body);
    const { name, status, label } = req.body;

    const existingGroup = await Group.findOne({ name });
    const totalDocuments = await Group.countDocuments();

    if (existingGroup) {
      return next(createError(403, "Already exists!"));
    }

    // 👤 create new add group object
    const newGroup = new Group({
      name,
      nameLabel: name,
      label,
      status,
    });

    await newGroup.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      count: totalDocuments,
      data: newGroup,
    });
  } catch (error) {
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
          message: "Already exists!",
        });
      }
    }

    // ⚠️ Handle unexpected errors (fallback)
    return next(error);
  }
}

// 📝 get all groups
async function getAllGroups(req, res, next) {
  try {
    const groups = await Group.find();

    if (!groups) {
      return next(createError(404, "Class not found!"));
    }

    // console.log("🔑 Fetched all groups:", groups);

    return res.status(200).json({
      success: true,
      message: "Groups fetched successfully!",
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    // console.error("❌ Error fetching groups:", error);

    // 💬 Passing the error to the next middleware
    return next(error);
  }
}

// 📝 Get all class with pagination
async function getAllPaginatedGroups(req, res, next) {
  try {
    console.log("query : ", req.query);
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

    const groups = await Group.find(searchQuery).skip(skip).limit(limit);

    const total = await Group.countDocuments();

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      count: groups.length,
      currentPage: page,
      totalPages,
      totalEntries: total,
      data: groups,
    });
  } catch (error) {
    console.error("❌ Error fetching groups: ", error);
    return next(error);
  }
}

// 📝 update group
async function updateGroup(req, res, next) {
  try {
    console.log("params value : ", req.params);
    console.log("body value : ", req.body);

    const { id } = req.params;
    const { name, label, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid grade type ID."));
    }

    const payload = {
      name,
      nameLabel: name,
      label: label || "Active",
      status: status || "active",
    };

    const existingGroup = await Group.findOne({
      name: payload.name,
      _id: { $ne: id },
    });

    if (existingGroup) {
      return next(createError(403, "Already Exists!"));
    }

    const updatedItem = await Group.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return next(createError(404, "Group not found!"));
    }

    const totalDocuments = await Group.countDocuments();

    console.log("🚀 update item value and counts : ", {
      count: totalDocuments,
      data: updatedItem,
    });

    return res.status(200).json({
      success: true,
      message: "Group updated successfully!",
      updatedData: updatedItem,
      totalDocuments,
    });
  } catch (error) {
    console.error(" 📌 ❌ updateGrouperror : ", error);
    return next(error);
  }
}

// 📝 Delete Group
async function deleteGroup(req, res, next) {
  try {
    console.log(" 🚀 deleteGroup params ", req.params);
    const { id } = req.params;

    if (!id) {
      return "❌ Class ID is required.";
    }

    const deletedItem = await Group.findByIdAndDelete(id);

    console.log("🚀 Group deleted:", deletedItem);
    if (deletedItem.deletedCount === 0) {
      console.log(`⚠️ Group with ID ${id} not found or already deleted.`);
      return next(createError(404, "Group not found or already deleted."));
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted.",
      deletedItem,
    });
  } catch (error) {
    console.log("🚀 deleteGroup error : ", error);
    return next(error);
  }
}

module.exports = {
  addGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
  getAllPaginatedGroups,
};
