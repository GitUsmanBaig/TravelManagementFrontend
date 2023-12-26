import { useMutation } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const useCreatePackage = id => {
  const apiClient = new APIClient(`/package/${id}`);

  return useMutation({
    mutationFn: data => apiClient.putRequest(data),
  });
};

export default useCreatePackage;
