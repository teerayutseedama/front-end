import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    clearError,
    register,
    resetRegistrationSuccess,
} from "../reducers/authSlice";
// Material UI imports
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registrationSuccess, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    dispatch(resetRegistrationSuccess());

    if (isAuthenticated) {
      navigate("/profile");
    }
    return () => {
      dispatch(clearError());
      dispatch(resetRegistrationSuccess());
    };
  }, [dispatch, isAuthenticated, navigate]);
  useEffect(() => {
    // If registration was successful, redirect to login or home
    if (registrationSuccess && isAuthenticated) {
      navigate("/"); // If auto-login after registration      } else {
    }
  }, [registrationSuccess, isAuthenticated, navigate]);
  const validateForm = () => {
    const errors = {};
    if (!userData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!userData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email is invalid";
    }
    if (!userData.password) {
      errors.password = "Password is required";
    } else if (userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!userData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registrationData } = userData;
    try {
      await dispatch(register(registrationData)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 2,
      }}
      component="main"
      maxWidth="sm"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {" "}
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {" "}
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {" "}
          Fill in the form below to create your account
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error.message || "Registration failed. Please try again."}{" "}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          {" "}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={userData.name}
            onChange={handleChange}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <PersonAddIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={userData.password}
            onChange={handleChange}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            value={userData.confirmPassword}
            onChange={handleChange}
            error={!!validationErrors.confirmPassword}
            helperText={validationErrors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}{" "}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}{" "}
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {" "}
              OR
            </Typography>{" "}
          </Divider>
          <Grid container justifyContent="center">
            <Grid item>
              {" "}
              <Link component={RouterLink} to="/" variant="body2">
                Already have an account? Sign in{" "}
              </Link>
            </Grid>{" "}
          </Grid>
        </Box>{" "}
      </Paper>
    
    </Container>
  );
}
