import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React from "react";
import NavContent from "./components/NavContent";
import TitleBar from "./components/TitleBar";

import { useDispatch, useSelector } from "react-redux";
import { updateLoader } from "./store/slices/LoaderSlice";

const App = () => {
  React.useEffect(() => {
    sessionStorage.clear();
  }, []);

  const open = useSelector(({ loader }) => loader?.load);

  const dispatch = useDispatch;

  const handleClose = () => {
    dispatch(updateLoader(false));
  };

  return (
    <div className="app">
      <Grid container>
        <Grid item xs={12} lg={12} md={12}>
          <TitleBar />
        </Grid>
        <Grid item xs={12} lg={12} md={12}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <NavContent />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
