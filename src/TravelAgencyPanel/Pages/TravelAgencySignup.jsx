import {
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import useSignup from "../Hooks/useSignup";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  name: z.string().min(8, "Name must be at least 8 characters."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  helplineNumber: z
    .string()
    .min(10, "Helpline must be at least 10 characters."),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Signup = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const handleFileChange = event => {
    console.log(file);
    setFile(event.target.files[0]);
    console.log(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useSignup();

  const checkData = async data => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };

    try {
      await mutation.mutateAsync({ ...data, image });
      // if (mutation.isSuccess) {
      toast.success("Signup Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // }
      navigate("/travel-agency/login");
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

  const form = useRef();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 9,
          marginBottom: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Travel Agency Sign up
        </Typography>
        <Box
          component="form"
          ref={form}
          noValidate
          onSubmit={handleSubmit(checkData)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                size="small"
                {...register("name")}
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                {...register("email")}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                {...register("password")}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                {...register("helplineNumber")}
                required
                fullWidth
                name="helplineNumber"
                label="HelplineNumber"
                id="helplineNumber"
                error={Boolean(errors.helplineNumber)}
                helperText={errors.helplineNumber?.message}
              />
            </Grid>
          </Grid>
          <Button
            component="label"
            variant="outlined"
            fullWidth
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/travel-agency/login" variant="body2">
                Login instead?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
