import { useQuery } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const useHotels = () => {
  const apiClient = new APIClient("/hotel");

  return useQuery({
    queryKey: [`hotel`],
    queryFn: async () => {
      const response = await apiClient.getRequest();
      return response.data;
    },
  });
};

export default useHotels;
