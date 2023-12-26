import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";

import BookingHistory from "./TravellerPanel/BookingHistory";
import FeedbackReceived from "./TravellerPanel/FeedbackReceived";
import FeedbackSent from "./TravellerPanel/FeedbackSent";
import ForgotPassword from "./TravellerPanel/ForgotPassword";
import HotelPackage from "./TravellerPanel/HotelPackage";
import UpdateCredentials from "./TravellerPanel/UpdateCredentials";
import UserBookings from "./TravellerPanel/UserBookings";
import UserDashboard from "./TravellerPanel/UserDashboard";
import UserLogin from "./TravellerPanel/UserLogin";
import UserProfile from "./TravellerPanel/UserProfile";
import UserSignup from "./TravellerPanel/UserSignup";


import AdminDashboard from "./SuperAdminPanel/Components/AdminDashboard";
import AdminLogin from "./SuperAdminPanel/Components/Login";
import AdminManageAgencies from "./SuperAdminPanel/Components/ManageAgencies";
import AdminManagePackage from "./SuperAdminPanel/Components/ManagePackages";
import ManageUsers from "./SuperAdminPanel/Components/ManageUsers";

import AdminManageQueries from "./SuperAdminPanel/Components/ManageQueries";
import AdminSignup from "./SuperAdminPanel/Components/Signup";
import AdminIndividualTravelAgency from "./SuperAdminPanel/Components/IndividualTravelAgency";


function App() {
  const TravelAgencyOutlet = () => {
    return (
      <>
        <TravelAgencyNavbar />
        <Outlet />
      </>
    );
  };

  const RootforPage = () => {
    return (
      <>
        <div>
          <h1>Root for Page</h1>
          <button>
            <Link to="/admin/login">Super Admin Panel</Link>
          </button>
          <button>
            <Link to="/travel-agency">
              Travel Agency Panel
            </Link>
          </button>
          <button>
            <Link to="/user/login">
              Traveller Panel
            </Link>
          </button>
          <button>
            <Link to="/hotel/login">
              Hotel Owner Panel
            </Link>
          </button>
        </div>
      </>
    );
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootforPage />} />

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
          <Route path="/user/feedbacksSent" element={<FeedbackSent />} />
          <Route path="/user/feedbacksReceived/:feedbackId" element={<FeedbackReceived />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/register" element={<AdminSignup />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-packages" element={<AdminManagePackage />} />
          <Route path="/admin/manage-agencies" element={<AdminManageAgencies />} />
          <Route path="/admin/manage-queries" element={<AdminManageQueries />} />
          <Route path="/admin/agency/:agencyId" element={<AdminIndividualTravelAgency/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
