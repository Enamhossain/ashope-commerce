const usersCollection = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJWTToken } = require("../utils/generateJWTToken");
const { generateVerificationPin } = require("../utils/generateVerificationpin");
const sendVerificationEmail = require("../nodeMailer/config/nodemailer")
const { ObjectId } = require("mongodb");
const tempUsers = new Map(); // Stores unverified users
const { welcomeEmailTemplate } = require("../nodeMailer/Templates/verificationPinEmailTemplate");



exports.updateProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const filter = { _id: new ObjectId(userId) };
    const updateDoc = { $set: updateData };

    const result = await usersCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", result });
  } catch (error) {
    console.error("🔥 Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};




exports.UsersDeleted= async (req,res)=>{
   try{
      const id = req.params.id;
      if(!ObjectId.isValid(id)){
         return res.status(400).json({message:"Invalid user ID"});
      }
      const result = await usersCollection.deleteOne({_id:new ObjectId(id)});
      if(result.deletedCount === 0){
         return res.status(404).json({message:"User not found"});
      }
      res.status(200).json({message:"User deleted successfully",result});
   } catch{

   }
}


exports.UsersAdminID = async (req, res) => {
  try {
    console.log("🔵 Received request:", req.method, req.url);
    console.log("📌 Params ID:", req.params.id);
    console.log("📌 Request Body:", req.body);

    const id = req.params.id;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      console.error("❌ Invalid user ID:", id);
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Ensure role is provided
    if (!req.body.role) {
      console.error("❌ Missing role in request body");
      return res.status(400).json({ message: "Role is required" });
    }

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { role: req.body.role } };
    
    console.log("🔄 Updating User:", filter, updateDoc);

    const result = await usersCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      console.warn("⚠️ No user found with ID:", id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User role updated successfully", result);
    res.status(200).json({ message: "User role updated", result });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.user = async (req, res) => {
  try {
    const { email, name, photoURL, uid } = req.body;
    if (!email || !name) {
      return res.status(400).json({ message: "Email and Name are required." });
    }

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists, logging in...",
        user: existingUser,
      });
    }

 

    const newUser = {
      email,
      name,
      photoURL: photoURL || "",
      uid,
      role: email === "konayi7002@kytstore.com" ? "admin" : "user",
      joined: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    if (!result.insertedId) throw new Error("User insertion failed");

    const token = generateJWTToken(res, result.insertedId, result.email, result.role);


    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("🔥 Backend Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



exports.Users = async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    if (!users || users.length === 0) {
      return res.status(200).json({
        message: "No users in database",
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const verificationPin = generateVerificationPin(); // Generate 6-digit PIN

    // Temporarily store user details
    tempUsers.set(email, {
      name: fullName,
      email,
      password: hashedPassword,
      authType: "credentials",
      verificationPin,
      role: email === "bsbrain221@gmail.com" ? "admin" : "user",
    });

    // Send verification email
    await sendVerificationEmail(email, verificationPin);

    res.status(201).json({
      success: true,
      message: "Verification email sent. Please verify your email to complete registration.",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    const user = await usersCollection.findOne({ email });
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Your email is not verified. Please check your inbox.",
      });
    }

    if (user.authType !== "credentials") {
      return res.status(400).json({
        success: false,
        message: "This email is registered with a different login method.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ✅ Ensure userRole exists, defaulting to "user" if missing
    const userRole = user.role || "user";

    const token = generateJWTToken(res, user._id,user.email, userRole);


    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: userRole, // Include userRole in the response
      },
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
    console.log(user)
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
    
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
    res
      .status(500)
      .json({ success: false, message: "An error occurred during logout" });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { email, verificationPin } = req.body;
    console.log("Received Email & PIN:", email, verificationPin);

    if (!email || !verificationPin) {
      return res.status(400).json({ error: "Email and verification pin are required." });
    }

    const tempUser = tempUsers.get(email);
    if (!tempUser) {
      return res.status(400).json({ error: "No pending registration found. Please register again." });
    }

    if (tempUser.verificationPin !== verificationPin) {
      return res.status(400).json({ error: "Invalid verification code." });
    }

    if (Date.now() > tempUser.expiresAt) {
      tempUsers.delete(email);
      return res.status(400).json({ error: "Verification pin has expired. Please register again." });
    }

    const newUser = { ...tempUser, isVerified: true, joined: new Date() };
    const result = await usersCollection.insertOne(newUser);
    tempUsers.delete(email);

    const userId = result.insertedId; // Extract userId from insertion result
    const userRole = newUser.role || "user"; // Default role if not provided

    const token = generateJWTToken(res, result.insertedId, result.email, result.role);


    try {
      await welcomeEmailTemplate(newUser.email, newUser.name);
    } catch (error) {
      console.error("Error sending welcome email:", error.message);
    }

    res.status(200).json({
      success: true,
      message: "Email successfully verified. Your account is now active.",
      token,
      user: {
        _id: userId,
        name: newUser.name,
        email: newUser.email,
        authType: "credentials",
        isVerified: true,
      },
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};



