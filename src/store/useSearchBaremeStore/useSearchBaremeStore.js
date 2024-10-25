import { create } from "zustand";

export const useSearchBaremeStore = create((set) => ({
  searchBareme: { date_bareme: "", categorie: "", indice: "" },
  setSearchBareme: (val) => {
    set((state) => ({ searchBareme: val }));
  },
  resetSearchBareme: () => {
    set((state) => ({
      search: { date_bareme: "", categorie: "", indice: "" },
    }));
  },
}));
