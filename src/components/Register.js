import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { createUser } from "../services/UserService";
import { resetForm, updateUser } from "../store/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLoader } from "../store/slices/LoaderSlice";

const Form = () => {
  const userName = useSelector(({ user }) => user?.userName || "");
  const email = useSelector(({ user }) => user?.email || "");
  const password = useSelector(({ user }) => user?.password || "");

  const [error, setError] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(
      updateUser({
        valueKey: [e.target.name],
        value: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    setError("")
    e.preventDefault();
    //Do Validations

    if (!email || !password || !userName) {
      return;
    }
    dispatch(updateLoader(true));

    const error = await createUser(email, password, userName);
    setTimeout(() => dispatch(updateLoader(false)), 500);
    if (error) {
      setError(error);
      return;
    } else {
      dispatch(updateUser({ valueKey: "loggedIn", value: true }));
      setTimeout(() => dispatch(updateLoader(false)), 500);
      navigate("/home");
    }
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <Typography align="center" variant="h5" color="primary">
          Register
        </Typography>
      </Grid>
      <Grid item>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <TextField
              label="User Name"
              fullWidth
              required
              style={{ marginBottom: 15 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              value={userName}
              name="userName"
              onChange={handleChange}
            />
            <TextField
              label="Email"
              fullWidth
              required
              type="email"
              style={{ marginBottom: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={email}
              name="email"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              fullWidth
              required
              type="password"
              style={{ marginTop: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              helperText={"Minimum 8 Characters"}
              value={password}
              name="password"
              onChange={handleChange}
            />

            <Grid item>
              {error && (
                <Grid item>
                  <Typography align="center" color="error">{error}</Typography>
                </Grid>
              )}
              <div style={{ margin: 30 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Sign Up
                </Button>
              </div>
            </Grid>
          </form>
        </div>
      </Grid>

      <Grid item>
        <Typography>
          Registered User Please
          <Button component={Link} to="/">
            Login
          </Button>
          here!
        </Typography>
      </Grid>
    </Grid>
  );
};

const Register = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <Form />
    </Box>
  );
};

export default Register;
