import crypto from "crypto";

export function getImageKitAuth() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const token = crypto.randomBytes(16).toString("hex");
  const expire = Date.now() + 600; // 10 min expiry
  const signature = crypto.createHmac("sha1", privateKey).update(token + expire).digest("hex");

  return { token, expire, signature };
}
