import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import TravelAgencyNavbar from "./TravelAgencyPanel/Components/TravelAgencyNavbar";
import TravelAgencyHome from "./TravelAgencyPanel/Pages/TravelAgencyHome";
import TravelAgencySignup from "./TravelAgencyPanel/Pages/TravelAgencySignup";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
