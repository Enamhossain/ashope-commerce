const express = require("express");
const {
  createUser,
  login,
  logOut,
  checkAuth,
  verifyEmail,
  user,
  Users,
  UsersAdminID,
  UsersDeleted,
  updateProfileById,
} = require("../Controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { getAllUsers } = require("../Controllers/AdminControllar");
const { verifyAdmin } = require("../middlewares/adminMiddleware");


const router = express.Router();


router.post("/auth/sign-up", createUser);
router.post("/auth/googlesignin",  user);
router.post("/auth/sign-in", login);
router.post("/auth/verify-email", verifyEmail);
router.post("/auth/logout", logOut);
router.patch("/auth/users/:id",verifyToken,   UsersAdminID)
router.patch("/auth/profile/:id",verifyToken, verifyAdmin,  updateProfileById)
router.delete("/auth/users/:id",verifyToken,  UsersDeleted)

// Protected Routes
router.get("/auth/check-auth", verifyToken, checkAuth);
router.get("/auth/users", verifyToken, getAllUsers);
router.get("/auth/AllUsers",  Users);

module.exports = router;
