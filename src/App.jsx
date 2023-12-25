import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
//import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";

import UserLogin from "./TravellerPanel/UserLogin";
import UserDashboard from "./TravellerPanel/UserDashboard";
import HotelPackage from "./TravellerPanel/HotelPackage";

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
            <Route path="register" element={<div>Signup</div>} />
            <Route path="login" element={<div>Login</div>} />
          </Route>

          <Route path="/user/login" element={<UserLogin />}/>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/hotelofpackage/:packageId" element={<HotelPackage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
