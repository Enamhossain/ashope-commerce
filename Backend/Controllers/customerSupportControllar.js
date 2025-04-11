

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "my_secure_token";
const PAGE_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

// Facebook Webhook Verification
export function verifyWebhook(req, res) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
}

// Handle Incoming Facebook Messages
export function handleWebhookEvent(req, res) {
  console.log("Received a webhook event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
}

// Send Notifications via Facebook Messenger
export async function sendNotification(req, res) {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v17.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: { id: userId },
        message: { text: message },
      }
    );

    console.log("Notification sent to:", userId);
    res.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Error sending notification:", error.response?.data);
    res.status(500).json({ error: "Failed to send notification" });
  }
}
