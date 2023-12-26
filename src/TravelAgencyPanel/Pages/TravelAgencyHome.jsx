//import React from "react";

import { CssBaseline, Typography } from "@mui/material";
import TravelAgencyPackages from "../Components/TravelAgencyPackages";

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Typography variant="h3" align="center" sx={{ mt: 3 }}>
        Travel Agency Panel
      </Typography>
      <Typography variant="h5">Packages Offered</Typography>
      <hr />
      <TravelAgencyPackages />
    </>
  );
};

export default Home;
