const createError = require("http-errors");
const Group = require("../../models/groupModel");

// 📝 do add group
async function addGroup(req, res, next) {
  try {
    console.log("📥 Received group data: ", req.body);
    const { name, status, label } = req.body;

    // if (!name || !status || !label) {
    //   return next(createError(709, "All fields required"));
    // }

    // check if already exists
    // todo fixed !already exits or not issue
    const existingGroup = await Group.findOne({ name });
    const totalDocuments = await Group.countDocuments();

    // console.log("existing group and total documents  : ", {
    //   count: totalDocuments,
    //   data: existingGroup,
    // });

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

    // console.log("🚀 Adding Group to DB: ", newGroup);

    await newGroup.save();

    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      count: totalDocuments,
      data: newGroup,
    });
  } catch (error) {
    // console.log(" 📌 addSession Error : ", error);
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

// 📝 update group
async function updateGroup(req, res, next) {
  try {
    const { id } = req.params;
    const payload = req.body;

    const existingGroup = await Group.findOne({ name: payload.name });

    if (existingGroup) {
      return next(createError(403, "Already Exists!"));
    }

    const updatedItem = await Group.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    const totalDocuments = await Group.countDocuments();

    if (!updatedItem) {
      return next(createError(404, "Group not found!"));
    }

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

module.exports = { addGroup, getAllGroups, updateGroup, deleteGroup };
