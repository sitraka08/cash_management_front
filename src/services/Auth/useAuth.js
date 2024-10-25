import axios from "axios";
import { API_URL } from "../url";

export const useAuth = {
  login: async (form) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
