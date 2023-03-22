import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { loginUser } from "../services/UserService";

import { Link } from "react-router-dom";
import { resetForm, updateUser } from "../store/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { updateLoader } from "../store/slices/LoaderSlice";

const LoginForm = () => {
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
    setError("");
    e.preventDefault();

    dispatch(updateLoader(true));

    const userCredential = await loginUser(email, password).catch((e) => {
      setError(e.message);
      setTimeout(() => dispatch(updateLoader(false)), 500);
    });

    if (!userCredential) {
      return;
    }

    dispatch(
      updateUser({ valueKey: "userName", value: userCredential.displayName })
    );

    dispatch(updateUser({ valueKey: "loggedIn", value: true }));

    setTimeout(() => dispatch(updateLoader(false)), 500);

    navigate("/home");
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <Typography align="center" variant="h5" color="primary">
          Login
        </Typography>
      </Grid>
      <Grid item>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
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
              required
              fullWidth
              type="password"
              style={{ marginTop: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              value={password}
              name="password"
              onChange={handleChange}
            />
            <Grid item>
              {error && (
                <Grid item>
                  <Typography align="center" color="error">
                    {error}
                  </Typography>
                </Grid>
              )}
              <div style={{ margin: 30 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </div>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item>
        <Typography>
          New User Please
          <Button component={Link} to="/signUp">
            Sign up
          </Button>
          here!
        </Typography>
      </Grid>
    </Grid>
  );
};

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <LoginForm />
    </Box>
  );
};

export default Login;
