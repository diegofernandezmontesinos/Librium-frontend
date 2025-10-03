
import { useCallback } from "react";

const COOKIE_NAME = "autorizado";
const COOKIE_DURATION_HOURS = 1;

export function useAuthCookie() {
  const setAuthCookie = useCallback((value: string) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + COOKIE_DURATION_HOURS * 60 * 60 * 1000);

    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
      value
    )}; Path=/; Expires=${expires.toUTCString()}; SameSite=Strict; Secure`;
  }, []);

  const getAuthCookie = useCallback((): string | null => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(COOKIE_NAME + "=")) {
        return decodeURIComponent(cookie.split("=")[1]);
      }
    }
    return null;
  }, []);

  const removeAuthCookie = useCallback(() => {
    document.cookie = `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure`;
  }, []);

  return { setAuthCookie, getAuthCookie, removeAuthCookie };
}
