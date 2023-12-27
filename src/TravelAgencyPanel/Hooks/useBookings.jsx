import { useQuery } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const useBookings = () => {
  const apiClient = new APIClient("/travel-agency/bookings");

  return useQuery({
    queryKey: [`bookings`],
    queryFn: async () => {
      const response = await apiClient.getRequest();
      return response.data;
    },
  });
};

export default useBookings;
