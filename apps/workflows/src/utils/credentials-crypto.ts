import "server-only";
import crypto from "crypto";

export const encryptCredentialData = (data: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CREDENTIALS_CRYPTO_KEY ?? "", "hex"),
    iv
  );
  const encrypted = Buffer.concat([
    cipher.update(data, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decryptCredentialData = (data: string) => {
  const [ivHex, encryptedHex] = data.split(":");
  if (!ivHex || !encryptedHex) {
    throw new Error("Invalid or corrupted cipher format");
  }
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CREDENTIALS_CRYPTO_KEY ?? "", "hex"),
    Buffer.from(ivHex, "hex")
  );
  return Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]).toString();
};
