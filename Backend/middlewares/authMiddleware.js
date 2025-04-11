const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    console.error("❌ No token found in cookies");
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Token:", decoded);

    if (!decoded.email) {  // 🔍 Check if email exists
      console.error("❌ Missing email in token payload");
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token - No email found" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized: Token verification failed" });
  }
};
