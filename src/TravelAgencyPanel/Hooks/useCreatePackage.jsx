import { useMutation } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const apiClient = new APIClient("/package");

const useCreatePackage = () => {
  return useMutation({
    mutationFn: data => apiClient.postRequest(data),
  });
};

export default useCreatePackage;
