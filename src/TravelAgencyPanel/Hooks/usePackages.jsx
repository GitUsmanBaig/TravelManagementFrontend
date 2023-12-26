import { useQuery } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const usePackages = id => {
  const apiClient = new APIClient(`/travel-agency/${id}/packages`);

  return useQuery({
    queryKey: [`/travel-agency/${id}/packages`],
    queryFn: async () => {
      const response = await apiClient.getRequest();
      return response.data;
    },
  });
};

export default usePackages;
