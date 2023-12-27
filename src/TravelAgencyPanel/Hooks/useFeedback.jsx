import { useQuery } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const useFeedback = () => {
  const apiClient = new APIClient("/travel-agency/feedback");

  return useQuery({
    queryKey: [`feedback`],
    queryFn: async () => {
      const response = await apiClient.getRequest();
      return response.data;
    },
  });
};

export default useFeedback;
