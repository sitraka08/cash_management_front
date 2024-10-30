import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../url";

const queryKey = "equipments";

const get = async () => {
  try {
    const res = await axios.get(`${API_URL}/${queryKey}`);
    return res.data;
  } catch (error) {
    throw error.message;
  }
};
export const add = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/${queryKey}`, data);
    return res.data;
  } catch (error) {
    throw error.message;
  }
};

export const update = async (data) => {
  try {
    const res = await axios.put(`${API_URL}/${queryKey}/${data.id}`, data);
    return res.data;
  } catch (error) {
    throw error.message;
  }
};

export const remove = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${queryKey}/${id}`);
    return res.data;
  } catch (error) {
    throw error.message;
  }
};

export const useEquipment = () => {
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
