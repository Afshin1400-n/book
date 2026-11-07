import { create } from "zustand";
import { persist } from "zustand/middleware";

type Appointment = {
  id: number;
  driverId: number;
  driverName: string;
  date: string;
  time: string;
};

type TurnState = {
  turns: Appointment[];   // ← turns (آرایه)
  addTurn: (appointment: Appointment) => void;
  removeTurn: (id: number) => void;
};

export const useTurnStore = create<TurnState>()(
  persist(
    (set) => ({
      turns: [],
      addTurn: (appointment) =>
        set((state) => ({ turns: [...state.turns, appointment] })),
      removeTurn: (id) =>
        set((state) => ({ turns: state.turns.filter((t) => t.id !== id) })),
      
    }),
    { name: "turn-storage" }
  )
);