import { useMutation } from "@tanstack/react-query";
import APIClient from "../Services/apiClient";

const apiClient = new APIClient("/travel-agency/");

const useSignup = () => {
  return useMutation({
    mutationFn: data => apiClient.postRequest(data),
  });
};

export default useSignup;



{/* <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
<Route path="/admin/register" element={<AdminSignup />} />
<Route path="/admin/manage-users" element={<ManageUsers />} />
<Route path="/admin/manage-packages" element={<AdminManagePackage />} />
<Route path="/admin/manage-agencies" element={<AdminManageAgencies />} />
<Route path="/admin/manage-queries" element={<AdminManageQueries />} />
<Route path="/admin/agency/:agencyId" element={<AdminIndividualTravelAgency/>} /> */}
