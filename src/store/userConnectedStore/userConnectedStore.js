import { create } from "zustand";

export const userConnectedStore = create((set) => ({
  userConnected: null,
  setUserConnected: (val) => {
    set((state) => ({ userConnected: val }));
  },
}));
