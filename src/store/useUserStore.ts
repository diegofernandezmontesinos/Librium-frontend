import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "../pages/login/Logintypes";
import { encryptedStorage } from "./encryptedStorage"; // usa el wrapper AES

// Definición del estado de usuario
interface UserState {
  username: string | null;
  role: UserRole | null;

  setUser: (username: string, role: UserRole) => void;
  setRole: (role: UserRole | null) => void;
  logout: () => void;

  // Flag para saber si ya hidrató desde storage
  _hasHydrated: boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      role: null,
      setUser: (username, role) => set({ username, role }),
      setRole: (role) => set({ role }),
      logout: () => set({ username: null, role: null }),
      _hasHydrated: false,
    }),
    {
      name: "USER",
      storage: encryptedStorage<UserState>(),
      partialize: (state) => ({
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

// -------- Safety net --------
if (typeof window !== "undefined") {
  const p = useUserStore.persist;
  if (p?.hasHydrated?.()) {
    useUserStore.setState({ _hasHydrated: true });
  } else {
    p?.onFinishHydration?.(() => {
      useUserStore.setState({ _hasHydrated: true });
    });

    // último recurso: desbloquear tras 2s
    setTimeout(() => {
      const s = useUserStore.getState();
      if (!s._hasHydrated) {
        useUserStore.setState({ _hasHydrated: true });
      }
    }, 2000);
  }
}
