const createError = require("http-errors");
const Session = require("../../models/sessionModel");

// 📝 do add session
async function addSession(req, res, next) {
  try {
    console.log("📥 Received session data: ", req.body);
    const { session, label, status } = req.body;

    // 🚨 Validate request data
    if (!session) {
      console.log("⚠️ [Session] Validation Error: Session name is required");
      return next(createError(404, "Session field is required!"));
    }

    if (session.trim().length === 0) {
      console.log(
        "⚠️ [Session] Validation Error: Session name cannot be empty!",
      );

      return next(createError(403, "Session field cannot be empty!"));
    }

    // check for existing session
    // noinspection JSCheckFunctionSignatures
    const existingSession = await Session.findOne({ session });

    if (existingSession) {
      return next(createError(403, "Session already exits!"));
    }

    // 👤 Create new shift object
    const newSessionObj = new Session({
      session,
      label,
      status,
    });

    console.log("🛠️ Preparing to save session:", newSessionObj);

    // 💾 Save the user to the database
    await newSessionObj.save();

    console.log("✅ [Session] Successfully added:", newSessionObj);

    // 🎉 Success response
    return res.status(201).json({
      success: true,
      message: "Session added successfully!",
      data: newSessionObj,
    });
  } catch (error) {
    console.log("Error adding session - without paginated", error);

    // custom Mongoose Error
    if (error.name === "ValidationError") {
      return next(createError(400, error.message));
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
    return next(error);
  }
}

// 📝 get all shifts - without pagination
async function getAllSessions(req, res, next) {
  try {
    console.log("📤 [Session] Fetching all sessions...");

    // 🛠️
    const sessions = await Session.find({});

    const totalSession = await Session.countDocuments();

    //* Check if no sessions exists
    if (!sessions || totalSession === 0) {
      console.log("⚠️ [Session] No sessions found");
      return next(createError(404, "No sessions found"));
    }

    console.log(`✅ [Session] Retrieved ${sessions.length} sessions`);

    //* Success response
    return res.status(200).json({
      success: true,
      message: "All sessions retrieved successfully!",
      count: totalSession,
      data: sessions || "No sessions found!",
    });
  } catch (error) {
    console.error("❌ [Session] Error retrieving data:", error.message);

    if (error.name === "ValidationError") {
      console.log(" 🛑 Mongoose Validation Error : ", error.message);
      return next(createError(400, error.message));
    }

    //! 🛑 Handle unexpected errors properly
    return next(createError(500, "Internal Server Error"));
  }
}

// 📝 get all shifts - with pagination
async function getAllPaginatedSession(req, res, next) {
  try {
    console.log("📥 Received request for sessions: ", req.query);
    const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
    const skip = Math.max(parseInt(req.query.skip, 10) || 0, 0);

    const sessions = await Session.find({}).skip(skip).limit(limit);

    const total = await Session.countDocuments();

    if (!sessions.length) {
      console.warn("⚠️ No shifts found");
      return res.status(404).json({
        success: false,
        message: "No shifts found",
      });
    }
    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
      total,
    });
  } catch (error) {
    console.error("❌ Error fetching sessions: ", error);
    return next(error);
  }
}

// 📝 Update Session
async function updateSession(req, res, next) {
  try {
    console.log("session params : ", req.params);
    const { id: sessionId } = req.params;
    const updatePayload = req.body;

    console.log(
      `🔄 Updating session [ID: ${sessionId}] with data:`,
      updatePayload,
    );

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      updatePayload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedSession) {
      console.warn(`⚠️ Session not found [ID: ${sessionId}]`);
      return next(createError(404, "Session not found!"));
    }

    console.log("✅ Successfully updated session:", updatedSession);

    return res.status(200).json({
      success: true,
      message: "Session updated successfully!",
      data: updatedSession, // ✅ Use `data` instead of `updatedData` for consistency
    });
  } catch (error) {
    console.error("❌ Error updating session:", error);
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
  getAllSessions,
  updateSession,
  getAllPaginatedSession,
  deleteSession,
};
