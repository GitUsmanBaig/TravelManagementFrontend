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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useLogin from "../Hooks/useLogin";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useLogin();

  const checkData = async data => {
    try {
      const response = await mutation.mutateAsync(data);
      localStorage.setItem("AgencyToken", response.token);
      localStorage.setItem("AgencyId", response.id);

      // if (mutation.isSuccess) {
      toast.success("Login Successful", {
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

      navigate("/travel-agency/");
      window.location.reload();
    } catch (error) {
      console.log(error);
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
    }

    reset();
  };

  const form = useRef();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          ref={form}
          noValidate
          onSubmit={handleSubmit(checkData)}
          sx={{ mt: 3 }}
        >
          <TextField
            {...register("email")}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/signup" variant="body2">
                Signup instead?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
