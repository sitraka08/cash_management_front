import { create } from "zustand";

export const useAgentStore = create((set) => ({
  agent: 0,
  setSelectedAgent: (val) => {
    set((state) => ({ agent: val === null ? {} : val }));
  },
}));
