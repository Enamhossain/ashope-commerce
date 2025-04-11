const express = require("express");
const { verifyWebhook, handleWebhookEvent, sendNotification } = require("../Controllers/customerSupportControllar");


const router = express.Router();

router.get("/webhook", verifyWebhook);
router.post("/webhook", handleWebhookEvent);
router.post("/send-notification", sendNotification);

module.exports = router;
