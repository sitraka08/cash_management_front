import { create } from "zustand";

export const useRefToastStore = create((set) => ({
  refToast: null,
  setRefToast: (val) => {
    set(() => ({ refToast: val }));
  },
}));
