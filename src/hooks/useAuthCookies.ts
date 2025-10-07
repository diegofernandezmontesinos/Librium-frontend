import { useCallback } from "react";
import { decrypt, encrypt } from "@/utils/encrypter/Encrypter";

const STORAGE_KEY = "isAuthorized";

export function useAuthStorage() {
  const setAuth = useCallback((value: boolean) => {
    const encryptedValue = encrypt(value);
    if (encryptedValue !== undefined) {
      localStorage.setItem(STORAGE_KEY, encryptedValue);
    }
  }, []);

  const getAuth = useCallback((): boolean => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    const decryptedValue = decrypt(stored);
    if (decryptedValue === "true") return true;
    if (decryptedValue === "false") return false;

    return false;
  }, []);

  const removeAuth = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { setAuth, getAuth, removeAuth };
}
