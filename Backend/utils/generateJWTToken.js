const jwt = require("jsonwebtoken");

exports.generateJWTToken = (res, userId, userEmail, userRole) => {
  if (!res?.cookie) {
    throw new Error("Invalid response object");
  }

  // ✅ Include `email` in the token payload
  const token = jwt.sign(
    { id: userId, email: userEmail, role: userRole },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
