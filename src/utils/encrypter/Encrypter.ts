import CryptoJS from "crypto-js";

export const getSecretKey = () =>
  import.meta.env.VITE_ENCRYPTION_KEY ||
  process.env.VITE_ENCRYPTION_KEY;

/*FYI: CryptoJs is a Js Library to encrypt and decrypt data using AES method, base64 and utf8 encoding.
 In the getDecryptedValue, to avoid fail decrypting, the function evaluates if the string is encrypted before attempting decryption using a regex with the cryptoJs pattern as initial parameter. */
export const encrypt = (text: string | boolean | null | undefined) => {
  const SECRET_KEY = getSecretKey();
  if (text === null || text === undefined) return;
  if (typeof text === "boolean") {
    text = text ? "true" : "false";
  }

  if (!SECRET_KEY) {
    console.warn("Encryption key is undefined. Returning plain text.");
    return "";
  }

  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (ciphertext: string) => {
  const SECRET_KEY = getSecretKey();
  if (!SECRET_KEY) {
    console.warn("Decryption key is undefined. Returning empty string.");
    return "";
  }

  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getDecryptedValue = (value: string | null | undefined) => {
  const SECRET_KEY = getSecretKey();
  if (!value || value === undefined) return "";
  try {
    if (!SECRET_KEY) {
      console.warn("Decryption key is undefined. Returning original value.");
      return value;
    }

    if (value.startsWith("U2FsdGVkX1"))
      return CryptoJS.AES.decrypt(value, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      );
    return value;
  } catch {
    return "";
  }
};

export const deepEncrypt = (
  obj: Record<string, string>
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = encrypt(value) ?? "";
  }
  return result;
};

export const deepDecrypt = (
  obj: Record<string, string>
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = value.startsWith("U2FsdGVkX1") ? decrypt(value) : value;
  }
  return result;
};
