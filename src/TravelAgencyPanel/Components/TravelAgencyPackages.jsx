import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";

import usePackages from "../Hooks/usePackages";
import { useStore } from "../Hooks/useStore";

const TravelAgencyPackages = () => {
  const { AgencyId } = useStore();

  const { isLoading, error, data } = usePackages(AgencyId);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CssBaseline />
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="error">
            Could not fetch data
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid container spacing={2} margin={2}>
            {data.map(packageData => (
              <Grid item key={packageData._id} xs={12} sm={6} md={4}>
                <Card elevation={3}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={packageData.name}
                      height="200"
                      image={
                        packageData.imageUrl || "https://placeholder.com/200"
                      }
                      title={packageData.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {packageData.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(packageData.startDate).toLocaleDateString()} -{" "}
                        {new Date(packageData.endDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="h6">
                        Price: {packageData.totalAmount}$
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Rating: {packageData.avgRating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Package Category: {packageData.packageCategory}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Bookings: {packageData.counttotalbookings}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Active: {packageData.isActive ? "Yes" : "No"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default TravelAgencyPackages;
