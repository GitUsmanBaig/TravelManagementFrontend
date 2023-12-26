import { useState } from "react";
import {
  CssBaseline,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useHotels from "../Hooks/useHotels";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { VisuallyHiddenInput } from "../Pages/TravelAgencySignup";
import useCreatePackage from "../Hooks/useCreatePackage";

const schema = z.object({
  name: z.string().min(8, "Name should be atleast 8 characters."),
  description: z.string().min(8, "Name should be atleast 8 characters"),
  city: z.string().min(4, "Please enter valid city name."),
  //   totalAmount: z.number().positive("Total Amount must be a positive number."),
  //   noOfPersons: z
  //     .number()
  //     .positive("Number of Persons must be a positive number.")
  //     .max(6, "Maximum number of persons can be 6"),
  packageCategory: z.string().min(1, "Package Category is required."),
});

const CreatePackage = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const handleFileChange = event => {
    //console.log(file);
    setFile(event.target.files[0]);
    //console.log(file);
  };

  const navigate = useNavigate();

  const { isLoading, error, data } = useHotels();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const form = useRef();

  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    city: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    isActive: true,
    // imageUrl: "",
    otherFacilites: "",
    totalAmount: 0,
    noOfPersons: 0,
    // travelAgency: "",
    hotel: "",
    disabled: false,
    ratings: [],
    reviews: [],
    avgRating: "",
    counttotalbookings: 0,
    packageCategory: "",
  });

  const handleChange = event => {
    setPackageData({ ...packageData, [event.target.name]: event.target.value });
  };

  const mutation = useCreatePackage();

  const checkData = async () => {
    //event.preventDefault();
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage(reader.result);
      };
    } catch (error) {
      toast.error("Unable to get image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    try {
      await mutation.mutateAsync({ ...packageData, image });
      toast.success("Package Creation Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/travel-agency/");
    } catch (error) {
      toast.error("Error: Please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
    reset();
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
            Could not fetch hotel data
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      component="form"
      ref={form}
      noValidate
      onSubmit={handleSubmit(checkData)}
    >
      <CssBaseline />
      <Box
        sx={{
          margin: 5,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create a New Package
        </Typography>
        <Box
          sx={{
            display: "flex",
            //flexDirection: "column",
            margin: 0,
            mt: 3,
          }}
          gap={2}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                {...register("name")}
                name="name"
                label="Name"
                value={packageData.name}
                onChange={handleChange}
                required
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("description")}
                name="description"
                label="Description"
                value={packageData.description}
                onChange={handleChange}
                required
                fullWidth
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("city")}
                name="city"
                label="City"
                value={packageData.city}
                onChange={handleChange}
                required
                fullWidth
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={packageData.startDate}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={packageData.endDate}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* <TextField
                name="imageUrl"
                label="Image URL"
                value={packageData.imageUrl}
                onChange={handleChange}
                required
                fullWidth
              /> */}
              <Select
                name="hotel"
                value={packageData.hotel}
                onChange={handleChange}
                required
                fullWidth
                error={Boolean(errors.hotel)}
                defaultValue={data[0]._id}
              >
                {data.map(hotel => (
                  <MenuItem key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                //{...register("totalAmount")}
                name="totalAmount"
                label="Total Amount"
                type="number"
                value={packageData.totalAmount}
                onChange={handleChange}
                required
                fullWidth
                //error={Boolean(errors.totalAmount)}
                //helperText={errors.totalAmount?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                //{...register("noOfPersons")}
                name="noOfPersons"
                label="Number of Persons"
                type="number"
                value={packageData.noOfPersons}
                onChange={handleChange}
                required
                fullWidth
                // error={Boolean(errors.noOfPersons)}
                // helperText={errors.noOfPersons?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="otherFacilites"
                label="Other Facilites (Optional)"
                value={packageData.otherFacilites}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Package Category</InputLabel>
                <Select
                  {...register("packageCategory")}
                  name="packageCategory"
                  value={packageData.packageCategory}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={Boolean(errors.packageCategory)}
                  defaultValue="Adventure"
                  //helperText={errors.packageCategory?.message}
                >
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Honeymoon">Honeymoon</MenuItem>
                  <MenuItem value="Religious">Religious</MenuItem>
                  <MenuItem value="Wildlife">Wildlife</MenuItem>
                  <MenuItem value="Group">Group</MenuItem>
                  <MenuItem value="Solo">Solo</MenuItem>
                  <MenuItem value="Friends">Friends</MenuItem>
                  <MenuItem value="Summer">Summer</MenuItem>
                  <MenuItem value="Winter">Winter</MenuItem>
                  <MenuItem value="Spring">Spring</MenuItem>
                  <MenuItem value="Autumn">Autumn</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        sx={{ mt: 1 }}
      >
        Upload Logo
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      {file && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mt: 1 }}>Selected file:</Typography>
          <Typography sx={{ mt: 1, color: "success.main" }}>
            {file.name}
          </Typography>
        </Box>
      )}
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 5 }}
        >
          Create Package
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePackage;
