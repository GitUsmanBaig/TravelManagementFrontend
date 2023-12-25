import { useMutation } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const apiClient = new APIClient("/travel-agency/");

const useSignup = () => {
  return useMutation({
    mutationFn: data => apiClient.postRequest(data),
  });
};

export default useSignup;
