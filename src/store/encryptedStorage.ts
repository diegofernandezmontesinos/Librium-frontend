import type { PersistStorage, StorageValue } from "zustand/middleware";
import { encrypt, getDecryptedValue } from "../utils/encrypter/Encrypter";

export const encryptedStorage = <T>(): PersistStorage<T> => ({
  getItem: (name: string): StorageValue<T> | null => {
    const value = sessionStorage.getItem(name);
    if (!value) return null;

    try {
      const decrypted = getDecryptedValue(value) ?? "";
      return JSON.parse(decrypted) as StorageValue<T>;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: StorageValue<T>): void => {
    try {
      const stringified = JSON.stringify(value);
      sessionStorage.setItem(name, encrypt(stringified) ?? "");
    } catch {
      console.error("Error encrypting value for storage", value);
    }
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
});
