const usersCollection = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJWTToken } = require("../utils/generateJWTToken");
const { generateVerificationPin } = require("../utils/generateVerificationpin");
const { sendVerificationEmail } = require("../resendMailer/email");

exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const verificationPin = generateVerificationPin();

    const newUser = {
      name: fullName,
      email,
      password: hashedPassword,
      verificationPin,
      verificationTokenExpiresAt: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
    };

    const result = await usersCollection.insertOne(newUser);

    generateJWTToken(res, result.insertedId);
    await sendVerificationEmail(result.email, verificationPin);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: result.insertedId,
        name: fullName,
        email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Incomplete credentials",
    });
  }

  try {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateJWTToken(res, user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await usersCollection.find().toArray();
    console.log("User fetched:", user);
    if (!user) {
      return res
        .status(404) // Use 404 for not found
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, user });
  } catch (error) {
    console.error("Error checking auth:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred during logout" });
  }
};

exports.verifyEmail = async (req, res) => {
  // Email verification logic can be added here
};
