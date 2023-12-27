//import React from "react";

import { CssBaseline, Typography, Box } from "@mui/material";
import TravelAgencyPackages from "../Components/TravelAgencyPackages";

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Typography variant="h3" align="center" sx={{ m: 3 }}>
        Travel Agency Panel
      </Typography>
      <Box sx={{ mx: 10 }}>
        <hr />
      </Box>
      <TravelAgencyPackages />
    </>
  );
};

export default Home;
