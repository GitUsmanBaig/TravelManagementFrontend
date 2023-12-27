import React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";
import TravelAgencyLogin from "./TravelAgencyPanel/Pages/TravelAgencyLogin";
import { useStore } from "./TravelAgencyPanel/Hooks/useStore";

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
import CreatePackage from "./TravelAgencyPanel/Components/CreatePackage";
import UpdatePackage from "./TravelAgencyPanel/Components/UpdatePackage";
import DeletePackage from "./TravelAgencyPanel/Components/DeletePackage";
import UserSignup from "./TravellerPanel/UserSignup";

import AdminDashboard from "./SuperAdminPanel/Components/AdminDashboard";
import AdminIndividualTravelAgency from "./SuperAdminPanel/Components/IndividualTravelAgency";
import AdminLogin from "./SuperAdminPanel/Components/Login";
import AdminManageAgencies from "./SuperAdminPanel/Components/ManageAgencies";
import AdminManagePackage from "./SuperAdminPanel/Components/ManagePackages";
import AdminManageQueries from "./SuperAdminPanel/Components/ManageQueries";
import ManageUsers from "./SuperAdminPanel/Components/ManageUsers";
import AdminSignup from "./SuperAdminPanel/Components/Signup";
import AdminManagePackage from "./SuperAdminPanel/Components/ManagePackages";
import AdminManageAgencies from "./SuperAdminPanel/Components/ManageAgencies";
import AdminManageQueries from "./SuperAdminPanel/Components/ManageQueries";
import AdminIndividualTravelAgency from "./SuperAdminPanel/Components/IndividualTravelAgency";


import HotelOwnerLogin from "./HotelOwnerPanel/Pages/HotelOwnerLogin";
import HotelOwnerSignup from "./HotelOwnerPanel/Pages/HotelOwnerSignup";
import HotelOwnerDashboard from "./HotelOwnerPanel/Pages/HotelOwnerDashboard";
import HotelDetailsPage from "./HotelOwnerPanel/Pages/HotelDetailsPage";
import UpdateHotelPage from "./HotelOwnerPanel/Pages/UpdateHotelPage";
import UpdateRoomPricing from "./HotelOwnerPanel/Pages/UpdateRoomPricing";
import UpdateBlackoutDatesPage from "./HotelOwnerPanel/Pages/UpdateBlackoutDatesPage";
import UpdateRoomAvailabilityPage from "./HotelOwnerPanel/Pages/UpdateRoomAvailabilityPage";
import PromotionsListPage from "./HotelOwnerPanel/Pages/PromotionsListPage";
import UpdatePromotionPage from "./HotelOwnerPanel/Pages/UpdatePromotionPage";
import AddPromotionPage from "./HotelOwnerPanel/Pages/AddPromotionPage";
import AddNewPropertyPage from "./HotelOwnerPanel/Pages/AddNewPropertyPage";
import ViewAllReservationsPage from "./HotelOwnerPanel/Pages/ViewAllReservationsPage";
import ViewReservationDetailsPage from "./HotelOwnerPanel/Pages/ViewReservationDetailsPage";
import UpdateReservationStatusPage from "./HotelOwnerPanel/Pages/UpdateReservationStatusPage";
import ViewAllReviews from "./HotelOwnerPanel/Pages/ViewAllReviews";
import ReviewResponsePage from "./HotelOwnerPanel/Pages/ReviewResponsePage";
import ViewAllInquiriesPage from "./HotelOwnerPanel/Pages/ViewAllInquiriesPage";


function App() {

  const handleLogin = (token) => {
    // Save the token in localStorage or context
    localStorage.setItem('token', token);
  };
  
  function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    
    if (!localStorage.getItem('token')) {
      // Redirect to the login page
      return <Navigate to="/hotel/login" replace />;
    }
  
    return children;
  }






  const setAgencyId = useStore(state => state.setAgencyId);
  const setAgencyToken = useStore(state => state.setAgencyToken);
  const Package = useStore(state => state.Package);

  const TravelAgencyOutlet = () => {
    return (
      <>
        <TravelAgencyNavbar />
        <Outlet />
      </>
    );
  };

  useEffect(() => {
    const AgencyToken = localStorage.getItem("AgencyToken");
    const AgencyId = localStorage.getItem("AgencyId");

    //console.log(AgencyToken, AgencyId);
    if (AgencyToken) {
      setAgencyToken(AgencyToken);
    }
    if (AgencyId) {
      setAgencyId(AgencyId);
    }
  }, []);
  const RootforPage = () => {
    const buttonStyle = {
      margin: "10px",
      padding: "10px 20px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    };

    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    };

    const headingStyle = {
      color: "#333",
      marginBottom: "20px",
    };

    return (
      <div style={containerStyle}>
        <h1 style={headingStyle}>Root for Page</h1>
        <button style={buttonStyle}>
          <Link
            to="/admin/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Super Admin Panel
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link
            to="/travel-agency"
            style={{ color: "white", textDecoration: "none" }}
          >
            Travel Agency Panel
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link
            to="/user/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Traveller Panel
          </Link>
        </button>
        <button style={buttonStyle}>
          <Link
            to="/hotel/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Hotel Owner Panel
          </Link>
        </button>
      </div>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootforPage />} />

          <Route path="/travel-agency/" element={<TravelAgencyOutlet />}>
            <Route index element={<TravelAgencyHome />} />
            <Route path="register" element={<TravelAgencySignup />} />
            <Route path="login" element={<TravelAgencyLogin />} />
            <Route path="create-package" element={<CreatePackage />} />
            <Route
              path="edit-package"
              element={<UpdatePackage oldPackage={Package} />}
            />
            <Route
              path="delete-package"
              element={<DeletePackage Package={Package} />}
            />
            <Route
              path="reviews-package"
              element={<DeletePackage Package={Package} />}
            />
          </Route>

          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route
            path="/user/hotelofpackage/:packageId"
            element={<HotelPackage />}
          />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/update_profile" element={<UpdateCredentials />} />
          <Route path="/user/bookings" element={<UserBookings />} />
          <Route path="/user/forgotpassword" element={<ForgotPassword />} />
          <Route path="/user/booking-history" element={<BookingHistory />} />
          <Route path="/user/feedbacksSent" element={<FeedbackSent />} />
          <Route
            path="/user/feedbacksReceived/:feedbackId"
            element={<FeedbackReceived />}
          />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/register" element={<AdminSignup />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-packages" element={<AdminManagePackage />} />
          <Route path="/admin/manage-agencies" element={<AdminManageAgencies />} />
          <Route path="/admin/manage-queries" element={<AdminManageQueries />} />
          <Route path="/admin/agency/:agencyId" element={<AdminIndividualTravelAgency/>} />

          
          <Route path="/hotel/login" element={<HotelOwnerLogin onLogin={handleLogin} />} />
          <Route path="/hotel/signup" element={<HotelOwnerSignup />} />
          <Route path="/hotel/dashboard" 
                 element={
                <ProtectedRoute>
                  <HotelOwnerDashboard />
                </ProtectedRoute>
                } 
          />
          <Route path="/hotel/details/:id" element={<HotelDetailsPage />} />
          <Route path="/hotel/update/:id" element={<UpdateHotelPage />} />
          <Route path="/hotel/update-room-pricing/:id" element={<UpdateRoomPricing />} />
          <Route path="/hotel/update-blackout-dates/:id" element={<UpdateBlackoutDatesPage />} />
          <Route path="/hotel/update-availability/:id" element={<UpdateRoomAvailabilityPage />} />
          <Route path="/hotel/:id/promotions" element={<PromotionsListPage />} />
          <Route path="/hotel/:hotelId/promotions/update/:promotionId" element={<UpdatePromotionPage />} />
          <Route path="/hotel/add-promotion/:id" element={<AddPromotionPage />} />
          <Route path="/hotel/add-property" element={<AddNewPropertyPage />} />
          <Route path="/hotel/reservations" element={<ViewAllReservationsPage />} />
          <Route path="/reservations/details/:reservationId" element={<ViewReservationDetailsPage />} />
          <Route path="/reservations/update-status/:reservationId" element={<UpdateReservationStatusPage />} />
          <Route path="/hotel/reviews" element={<ViewAllReviews />} />
          <Route path="/review/respond/:reviewId" element={<ReviewResponsePage />} />
          <Route path="/hotel/:id/inquiries" element={<ViewAllInquiriesPage />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
