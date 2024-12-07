const express = require("express");
const {
  createUser,
  login,
  logOut,
  checkAuth,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.post("/logOut", logOut);

router.get('/user',checkAuth)

module.exports = router;
