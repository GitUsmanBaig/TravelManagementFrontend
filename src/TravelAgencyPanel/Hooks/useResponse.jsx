import { useMutation } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const apiClient = new APIClient("/travel-agency/feedback");

const useResponse = () => {
  return useMutation({
    mutationFn: data => apiClient.putRequest(data),
  });
};

export default useResponse;
