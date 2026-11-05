import { create } from "zustand";
import { persist } from "zustand/middleware";

type Driver = {
  id: number;
  name: string;
  nationalId: string;
  password: string;
};

type AuthState = {
  user: Driver | null;
  drivers: Driver[];
  register: (driver: Driver) => void;
  login: (user: Driver) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      drivers: [],
      register: (driver) =>
        set((state) => ({ drivers: [...state.drivers, driver] })),
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" }
  )
);