import { create } from "zustand";

export const useBaremeStore = create((set) => ({
  bareme: 0,
  setSelectedBareme: (val) => {
    set((state) => ({ bareme: val === null ? {} : val }));
  },
  resetSelectedBareme: () => {
    set((state) => ({ bareme: 0 }));
  },
}));
