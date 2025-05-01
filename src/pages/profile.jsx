import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../reducers/authSlice";
// Material UI imports
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LogoutButton from "../components/LogoutButton";
export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    } else {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate]);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />{" "}
      </Box>
    );
  }
  if (error) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
        maxWidth="sm"
      >
        {" "}
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error.message || "Failed to load profile data"}{" "}
        </Alert>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Login{" "}
        </Button>
      </Container>
    );
  }
  if (!user) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
        maxWidth="sm"
      >
        <Alert severity="warning" sx={{ width: "100%", mb: 2 }}>
          {" "}
          Please log in to view your profile.
        </Alert>{" "}
        <Button variant="contained" onClick={() => navigate("/")}>
          {" "}
          Go to Login
        </Button>{" "}
      </Container>
    );
  }
  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 4,
      }}
      maxWidth="md"
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              fontSize: "2.5rem",
              mb: 2,
            }}
          >
            {" "}
            {getInitials(user.name)}
          </Avatar>{" "}
          <Typography component="h1" variant="h4">
            {user.name || "User"}{" "}
          </Typography>
          {user.role && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {user.role}{" "}
            </Typography>
          )}{" "}
        </Box>
        <Divider sx={{ mb: 3 }} />
        <List sx={{ width: "100%" }}>
          <ListItem>
            {" "}
            <ListItemAvatar>
              <Avatar>
                {" "}
                <PersonIcon />
              </Avatar>{" "}
            </ListItemAvatar>
            <ListItemText
              primary="Name"
              secondary={user.name || "Not provided"}
            />{" "}
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              {" "}
              <Avatar>
                <EmailIcon />{" "}
              </Avatar>
            </ListItemAvatar>{" "}
            <ListItemText
              primary="Email"
              secondary={user.email || "Not provided"}
            />
          </ListItem>
          {user.phone && (
            <ListItem>
              <ListItemAvatar>
                {" "}
                <Avatar>
                  <PhoneIcon />{" "}
                </Avatar>
              </ListItemAvatar>{" "}
              <ListItemText primary="Phone" secondary={user.phone} />
            </ListItem>
          )}
          {user.createdAt && (
            <ListItem>
              {" "}
              <ListItemAvatar>
                <Avatar>
                  {" "}
                  <CalendarTodayIcon />
                </Avatar>{" "}
              </ListItemAvatar>
              <ListItemText
                primary="Member Since"
                secondary={new Date(user.createdAt).toLocaleDateString()}
              />
            </ListItem>
          )}
        </List>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          {" "}
          <LogoutButton></LogoutButton>
        </Box>
      </Paper>{" "}
    </Container>
  );
}
