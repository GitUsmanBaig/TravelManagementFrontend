import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";

import HotelPackage from "./TravellerPanel/HotelPackage";
import UpdateCredentials from "./TravellerPanel/UpdateCredentials";
import UserBookings from "./TravellerPanel/UserBookings";
import UserDashboard from "./TravellerPanel/UserDashboard";
import UserLogin from "./TravellerPanel/UserLogin";
import UserProfile from "./TravellerPanel/UserProfile";
import UserSignup from "./TravellerPanel/UserSignup";
import ForgotPassword from "./TravellerPanel/ForgotPassword";
import BookingHistory from "./TravellerPanel/BookingHistory";


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

          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/hotelofpackage/:packageId" element={<HotelPackage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/update_profile" element={<UpdateCredentials />} />
          <Route path="/user/bookings" element={<UserBookings />} />
          <Route path="/user/forgotpassword" element={<ForgotPassword />} />
          <Route path="/user/booking-history" element={<BookingHistory />} />

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
