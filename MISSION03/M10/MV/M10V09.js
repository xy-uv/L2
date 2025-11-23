const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encryption = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypt = cipher.update(text, "utf-8", "hex");
  encrypt += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encrypted: encrypt,
  };
};

const decryption = (ivHex, data) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
console.log("Encrypted Data : ");
const sensitiveData = "4242 4242 4242 4242";
console.log("original data : ", sensitiveData);

const encrypted = encryption(sensitiveData);
console.log("Encrypted : ", encrypted);

console.log("Decrypted data : ");
const decrypted = decryption(encrypted.iv, encrypted.encrypted);
console.log("Decrypted : ", decrypted);

// console.log("IV: ", iv);
// console.log(Buffer.from(encrypted.iv, "hex"));
// console.log("IV Hex: ", encrypted.iv);
// console.log("match : "), iv === Buffer.from(encrypted.iv, "hex");
console.log("match : ", sensitiveData === decrypted);
