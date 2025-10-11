// src/store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "../pages/login/Logintypes";
import { encryptedStorage } from "./encryptedStorage";

// -------- INTERFACES --------
interface UserState {
  id: number | null;
  username: string | null;
  role: UserRole | null;

  setUser: (id: number, username: string, role: UserRole) => void;
  setRole: (role: UserRole | null) => void;
  logout: () => void;

  _hasHydrated: boolean;
}

// -------- STORE --------
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      username: null,
      role: null,
      setUser: (id, username, role) => set({ id, username, role }),
      setRole: (role) => set({ role }),
      logout: () => set({ id: null, username: null, role: null }),
      _hasHydrated: false,
    }),
    {
      name: "USER",
      storage: encryptedStorage<UserState>(),
      partialize: (state) => ({
        id: state.id,
        username: state.username,
        role: state.role,
        _hasHydrated: state._hasHydrated,
      }),
      onRehydrateStorage: () => () => {
        useUserStore.setState({ _hasHydrated: true });
      },
    }
  )
);

// -------- SAFETY NET --------
if (typeof window !== "undefined") {
  const p = useUserStore.persist;
  if (p?.hasHydrated?.()) {
    useUserStore.setState({ _hasHydrated: true });
  } else {
    p?.onFinishHydration?.(() => {
      useUserStore.setState({ _hasHydrated: true });
    });

    setTimeout(() => {
      const s = useUserStore.getState();
      if (!s._hasHydrated) {
        useUserStore.setState({ _hasHydrated: true });
      }
    }, 2000);
  }
}
