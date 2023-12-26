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
import AdminIndividualTravelAgency from "./SuperAdminPanel/Components/IndividualTravelAgency";
import AdminLogin from "./SuperAdminPanel/Components/Login";
import AdminManageAgencies from "./SuperAdminPanel/Components/ManageAgencies";
import AdminManagePackage from "./SuperAdminPanel/Components/ManagePackages";
import AdminManageQueries from "./SuperAdminPanel/Components/ManageQueries";
import ManageUsers from "./SuperAdminPanel/Components/ManageUsers";
import AdminSignup from "./SuperAdminPanel/Components/Signup";
// import AdminIndividualTravelAgency from "./SuperAdminPanel/Components/IndividualTravelAgency";


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
    const buttonStyle = {
      margin: '10px',
      padding: '10px 20px',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    };

    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    };

    const headingStyle = {
      color: '#333',
      marginBottom: '20px',
    };

    return (
      <div style={containerStyle}>
        <h1 style={headingStyle}>Root for Page</h1>
        <button style={buttonStyle}>
          <Link to="/admin/login" style={{ color: 'white', textDecoration: 'none' }}>Super Admin Panel</Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/travel-agency" style={{ color: 'white', textDecoration: 'none' }}>
            Travel Agency Panel
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/user/login" style={{ color: 'white', textDecoration: 'none' }}>
            Traveller Panel
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/hotel/login" style={{ color: 'white', textDecoration: 'none' }}>
            Hotel Owner Panel
          </Link>
        </button>
      </div>
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
          <Route path="/admin/agency/:agencyId" element={<AdminIndividualTravelAgency />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
