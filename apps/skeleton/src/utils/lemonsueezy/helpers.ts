import "server-only";
import crypto from "crypto";

export function checkLemonSqueezySignature(
  rawBody: string,
  requestSignature: string
) {
  const hmac = crypto.createHmac(
    "sha256",
    process.env.LEMONSQUEEZY_WEBHOOK_SUBSCRIPTION_SIGNATURE ?? ""
  );
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signatureBuffer = Buffer.from(requestSignature, "utf8");

  return crypto.timingSafeEqual(digest, signatureBuffer);
}
