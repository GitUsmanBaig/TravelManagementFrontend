import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";
import TravelAgencyLogin from "./TravelAgencyPanel/Pages/TravelAgencyLogin";

import UserLogin from "./TravellerPanel/UserLogin";
import UserDashboard from "./TravellerPanel/UserDashboard";
import HotelPackage from "./TravellerPanel/HotelPackage";
import UserProfile from "./TravellerPanel/UserProfile";

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
            <Route path="login" element={<TravelAgencyLogin />} />
          </Route>

          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route
            path="/user/hotelofpackage/:packageId"
            element={<HotelPackage />}
          />
          <Route path="/user/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
