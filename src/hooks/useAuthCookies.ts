import { useCallback } from "react";
import { decrypt, encrypt } from "@/utils/encrypter/Encrypter";

const STORAGE_KEY = "auth";

interface AuthData {
  token: string;
  username?: string;
  role?: string;
  autenticated?: boolean;
}

export function useAuthStorage() {
  const setAuth = useCallback((authData: AuthData) => {
    const encryptedValue = encrypt(JSON.stringify(authData));
    if (encryptedValue !== undefined) {
      localStorage.setItem(STORAGE_KEY, encryptedValue);
    }
  }, []);

  const getAuth = useCallback((): AuthData | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      const decryptedValue = decrypt(stored);
      return JSON.parse(decryptedValue) as AuthData;
    } catch {
      return null;
    }
  }, []);

  const removeAuth = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { setAuth, getAuth, removeAuth };
}
