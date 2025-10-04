import { useCallback } from "react";

const STORAGE_KEY = "isAuthorized";

export function useAuthStorage() {
  const setAuth = useCallback((value: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, []);

  const getAuth = useCallback((): boolean => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  }, []);

  const removeAuth = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { setAuth, getAuth, removeAuth };
}
