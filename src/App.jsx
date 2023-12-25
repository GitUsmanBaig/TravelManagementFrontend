import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";

import UserLogin from "./TravellerPanel/UserLogin";
import UserDashboard from "./TravellerPanel/UserDashboard";
import HotelPackage from "./TravellerPanel/HotelPackage";
import UserProfile from "./TravellerPanel/UserProfile";


import AdminLogin from "./SuperAdminPanel/Components/Login";
import AdminDashboard from "./SuperAdminPanel/Components/AdminDashboard";
import AdminSignup from "./SuperAdminPanel/Components/Signup";
import ManageUsers from "./SuperAdminPanel/Components/ManageUsers";

function App() {
  const TravelAgencyOutlet = () => {
    return (
      <>
        <TravelAgencyNavbar />
        <Outlet />
      </>
    );
  };



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/travel-agency/" element={<TravelAgencyOutlet />}>
            <Route index element={<TravelAgencyHome />} />
            <Route path="register" element={<TravelAgencySignup />} />
            <Route path="login" element={<div>Login</div>} />
          </Route>

          <Route path="/user/login" element={<UserLogin />}/>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/hotelofpackage/:packageId" element={<HotelPackage />} />
          <Route path="/user/profile" element={<UserProfile />} />

          <Route path = "/admin/login" element={<AdminLogin />} />
          <Route path = "/admin/admin-dashboard" element={<AdminDashboard />} />
          <Route path = "/admin/register" element={<AdminSignup />} />
          <Route path = "/admin/manage-users" element={<ManageUsers />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
