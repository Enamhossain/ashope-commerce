
const jwt = require("jsonwebtoken");

exports.generateJWTToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.Secret_KEY, {
    expiresIn: "7d", // Token validity
  });

  res.cookie("token", token, {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "strict", // Prevent cross-site request forgery (CSRF)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  return token;
};
