import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../url";

const get = async () => {
  try {
    const res = await axios.get(`${API_URL}/statistiques`);
    return res.data;
  } catch (error) {
    throw error.message;
  }
};

const queryKey = "statistique";

export const useStatistique = () => {
  const {
    error,
    data = [],
    isError,
    isFetching,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => get(),
    refetchOnWindowFocus: false,
    staleTime: 15 * 60 * 1000,
  });

  return { error, data, isError, isFetching };
};
