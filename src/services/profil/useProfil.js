import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../url";

const get = async () => {
  try {
    const res = await axios.get(`${API_URL}/my_profile`);
    return res.data;
  } catch (error) {
    throw error.message;
  }
};
export const update = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/update_profile`, data);
    return res.data;
  } catch (error) {
    throw error.message;
  }
};

const queryKey = "profil";

export const useProfil = () => {
  const {
    error,
    data = [],
    isError,
    isFetching,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => get(),
    refetchOnWindowFocus: false,
  });

  return { error, data, isError, isFetching };
};
