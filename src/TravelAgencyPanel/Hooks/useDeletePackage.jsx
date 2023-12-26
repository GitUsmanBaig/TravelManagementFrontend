import { useMutation } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const useDeletePackage = id => {
  const apiClient = new APIClient(`/package/${id}`);

  return useMutation({
    mutationFn: () => apiClient.deleteRequest(),
  });
};

export default useDeletePackage;
