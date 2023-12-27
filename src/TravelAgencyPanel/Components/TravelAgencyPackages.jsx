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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import usePackages from "../Hooks/usePackages";
import { useStore } from "../Hooks/useStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { toast } from "react-toastify";
// import  from "@material-ui/material/Dialog";
// import DialogTitle from "@material-ui/material/DialogTitle";
// import DialogContent from "@material-ui/material/DialogContent";

const TravelAgencyPackages = () => {
  const { AgencyId, Package } = useStore();
  const [open, setOpen] = useState(false);
  //const [reviews, setReviews] = useState([]);

  const { isLoading, error, data } = usePackages(AgencyId);
  const setPackage = useStore(state => state.setPackage);

  const navigate = useNavigate();

  const handleEdit = packageData => {
    setPackage(packageData);
    navigate(`/travel-agency/edit-package`);
  };

  const handleDelete = async packageData => {
    setPackage(packageData);
    navigate(`/travel-agency/delete-package`);
  };

  const handleReviews = async packageData => {
    setPackage(packageData);
    setOpen(true);
  };

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

  if (open) {
    return (
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={"md"}>
        <DialogTitle>Package Reviews</DialogTitle>
        <hr />
        <DialogContent>
          {Package.reviews.map((review, index) => (
            <Typography variant="subtitle2" color="secondary" key={index}>
              {review}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
          flexDirection={"column"}
        >
          <Typography variant="h5">Packages Offered</Typography>
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
                    <>
                      <Button
                        size="small"
                        onClick={() => handleReviews(packageData)}
                      >
                        Reviews
                      </Button>
                    </>
                    <>
                      <Button
                        size="small"
                        onClick={() => handleEdit(packageData)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleDelete(packageData)}
                      >
                        Delete
                      </Button>
                    </>
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
