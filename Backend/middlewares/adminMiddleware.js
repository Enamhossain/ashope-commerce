const usersCollection = require("../models/user");

exports.verifyAdmin = async (req, res, next) => {
  try {
    console.log("🔍 Verifying admin access...");

    const email = req.decoded?.email;

    if (!email) {
      console.error("❌ Missing or invalid token - No email found.");
      return res.status(401).json({ message: "Unauthorized: Missing email" });
    }

    const user = await usersCollection.findOne({ email });

    if (!user) {
      console.error(`❌ User not found for email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      console.warn(`🚫 Access denied for ${email}, role: ${user.role}`);
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    console.log(`✅ Admin access granted for ${email}`);
    next();
  } catch (error) {
    console.error("🔥 Error verifying admin:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
