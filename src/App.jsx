import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";
import TravelAgencyLogin from "./TravelAgencyPanel/Pages/TravelAgencyLogin";
import { useStore } from "./TravelAgencyPanel/Hooks/useStore";

import UserLogin from "./TravellerPanel/UserLogin";
import UserDashboard from "./TravellerPanel/UserDashboard";
import HotelPackage from "./TravellerPanel/HotelPackage";
import UserProfile from "./TravellerPanel/UserProfile";
import CreatePackage from "./TravelAgencyPanel/Components/CreatePackage";
import UpdatePackage from "./TravelAgencyPanel/Components/UpdatePackage";
import DeletePackage from "./TravelAgencyPanel/Components/DeletePackage";
import ViewBookings from "./TravelAgencyPanel/Components/ViewBookings";
import Feedback from "./TravelAgencyPanel/Components/Feedback";

function App() {
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/travel-agency/" element={<TravelAgencyOutlet />}>
            <Route index element={<TravelAgencyHome />} />
            <Route path="register" element={<TravelAgencySignup />} />
            <Route path="login" element={<TravelAgencyLogin />} />
            <Route path="create-package" element={<CreatePackage />} />
            <Route path="bookings" element={<ViewBookings />} />
            <Route path="feedback" element={<Feedback />} />
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
