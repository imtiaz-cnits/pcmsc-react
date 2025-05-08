const createError = require("http-errors");
const Session = require("../../models/sessionModel");

// 📝 do add session
async function addSession(req, res, next) {
  try {
    console.log("📥 Received session data: ", req.body);

    const { name, status, label } = req.body;

    // check if already exists
    const existingSession = await Session.findOne({ name });
    const totalDocuments = await Session.countDocuments();

    // documents count

    console.log("existing session : ", existingSession);
    console.log("total session documents : ", totalDocuments);
    console.log(null);
    if (existingSession) {
      return next(createError(403, "Session already exists!"));
    }

    // 👤 create new add session object
    const newSession = new Session({
      name,
      nameLabel: name,
      label,
      status,
    });
    console.log("new added session", newSession);

    // 💾 Save the user to the database
    const addedItem = await newSession.save();

    // 🎉 Success response
    return res.status(200).json({
      success: true,
      message: "Successfully added!",
      data: addedItem,
    });
  } catch (error) {
    console.log("Error in adding session: ", error);
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

// 📝 Get all session
async function getAllSession(req, res, next) {
  try {
    const sessions = await Session.find({});

    if (!sessions) {
      return next(createError(404, "Session not found!"));
    }

    // console.log("🔑 Fetched all sessions :", sessions);

    return res.status(200).json({
      success: true,
      message: "Sessions fetched successfully!",
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    console.error("❌ Error fetching session:", error);
    return next(error);
  }
}

// 📝 Get all session with pagination
async function getAllPaginatedSession(req, res, next) {
  try {
    console.log("📥 Received request for session: ", req.query);

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

    const sessions = await Session.find(searchQuery).skip(skip).limit(limit);

    const total = await Session.countDocuments();

    const totalPages = Math.ceil(total / limit);

    console.log("✅ Retrieved session: ", sessions);
    return res.status(200).json({
      success: true,
      count: sessions.length,
      currentPage: page,
      totalPages,
      totalEntries: total,
      data: sessions,
    });
  } catch (error) {
    console.error("❌ Error fetching session: ", error);
    return next(error);
  }
}

// 📝 Get all session with entries
async function getAllEntriesSession(req, res, next) {
  try {
    console.log("📥 Received request for session: ", req.query);
    const limit = parseInt(req.query.limit, 10) || 5;

    const entries = await Session.find({}).limit(limit);
    const totalEntries = await Session.countDocuments();

    console.log("✅ Retrieved session: ", entries);
    return res.status(200).json({
      success: true,
      count: entries.length,
      total: totalEntries,
      data: entries,
    });
  } catch (error) {
    console.error("❌ Error fetching sessions :", error);
    return next(error);
  }
}

// 📝 Update Session
async function updateSession(req, res, next) {
  try {
    console.log("session params : ", req.params);
    const { id: sessionId } = req.params;
    const { name: section, label, status } = req.body;

    const updatePayload = {
      name: section,
      nameLabel: section.charAt(0).toUpperCase() + section.slice(1),
      label,
      status,
    };
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      updatePayload,
      {
        new: true,
        runValidators: true,
      },
    );

    console.log("✅ Successfully updated session:", updatedSession);

    return res.status(200).json({
      success: true,
      message: "Session updated successfully!",
      data: updatedSession, // ✅ Use `data` instead of `updatedData` for consistency
    });
  } catch (error) {
    console.error("❌ Error updating session:", error);
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

// 📝 delete session
async function deleteSession(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return "session id not found!";
    }

    const sessionDeleted = await Session.findByIdAndDelete(id);

    if (!sessionDeleted) {
      return next(createError(404, "⚠️ Shift not found or already deleted."));
    }

    return res.status(200).json({
      status: true,
      message: "Session removed successfully!",
      deletedItem: sessionDeleted,
    });
  } catch (error) {
    console.log("delete session error : ", error);

    return next(error);
  }
}

// exports
module.exports = {
  addSession,
  getAllSession,
  getAllPaginatedSession,
  getAllEntriesSession,
  updateSession,
  deleteSession,
};
