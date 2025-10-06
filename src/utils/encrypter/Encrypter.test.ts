import * as Encrypter from "./Encrypter";
 import { describe, it, expect, beforeEach } from "vitest";
 
 describe("Crypto Utils", () => {
 beforeEach(() => {
 process.env.VITE_ENCRYPTING_SECRET_KEY = "test-secret-key";
 });
 
 it("should encrypt and decrypt a string correctly", () => {
 const original = "hello world";
 const encrypted = Encrypter.encrypt(original);
 expect(encrypted).toBeDefined();
 expect(encrypted).not.toBe(original);
 
 const decrypted = Encrypter.decrypt(encrypted!);
 expect(decrypted).toBe(original);
 });
 
 it("should handle boolean values in encryption", () => {
 expect(Encrypter.decrypt(Encrypter.encrypt(true)!)).toBe("true");
 expect(Encrypter.decrypt(Encrypter.encrypt(false)!)).toBe("false");
 });
 
 it("should return original value if not encrypted", () => {
 const plainText = "not encrypted";
 expect(Encrypter.getDecryptedValue(plainText)).toBe(plainText);
 });
 
 it("should return empty string for null, undefined or empty input", () => {
 expect(Encrypter.getDecryptedValue(null)).toBe("");
 expect(Encrypter.getDecryptedValue(undefined)).toBe("");
 expect(Encrypter.getDecryptedValue("")).toBe("");
 });
 });