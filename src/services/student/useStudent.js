import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../url";

const queryKey = "students";

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

export const update = async (id, data) => {
  console.log(data, "data");
  try {
    const res = await axios.put(`${API_URL}/${queryKey}/${id}`, data);
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

export const useStudent = () => {
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
