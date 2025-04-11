const express = require('express');
const { bannersGet, bannerPost, bannerEdit, bannerDelete } = require('../Controllers/UiControllar');
const router = express.Router();

// Attach routes to the router
router.get("/", bannersGet);
router.post("/", bannerPost);
router.patch("/:id", bannerEdit);
router.delete("/:id", bannerDelete);

module.exports = router;