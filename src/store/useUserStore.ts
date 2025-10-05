import { create } from "zustand";
import { encryptData, decryptData } from "../utils/encrypter/Encrypter";
import { UserRole } from "../pages/login/Logintypes";

interface UserState {
  username: string | null;
  role: UserRole | null;
  setUser: (username: string, role: UserRole) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => {
  // Recuperar datos encriptados del sessionStorage
  const stored = sessionStorage.getItem("UN");
  const initialState = stored
    ? decryptData(stored)
    : { username: null, role: null };

  return {
    username: initialState.username,
    role: initialState.role,
    setUser: (username, role) => {
      const data = { username, role };
      sessionStorage.setItem("UN", encryptData(data)); // 🔒 guardar encriptado
      set(data);
    },
    logout: () => {
      sessionStorage.removeItem("UN");
      set({ username: null, role: null });
    },
  };
});
