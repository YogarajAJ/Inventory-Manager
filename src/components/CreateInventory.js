import { Button, Grid, Snackbar, Stack, Typography } from "@mui/material";
import React from "react";
import { DEFAULT_FORM } from "../constants";
import { insertData } from "../services/FileService";
import Form from "./form";
import { useDispatch, useSelector } from "react-redux";

import MuiAlert from "@mui/material/Alert";
import { resetForm } from "../store/slices/InventorySlice";
import { get } from "lodash";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateInventory = () => {
  const [open, setOpen] = React.useState(false);

  const inventoryData = useSelector(({ inventory }) => inventory);

  let totalPrice = 0;

  if (inventoryData) {
    totalPrice =
      parseInt(get(inventoryData, "UNIT PRICE", 0)) *
        parseInt(get(inventoryData, "MOQ/REQUESTED QTY", 1)) +
      parseInt(get(inventoryData, "CORE CHARGES", 0) || 0);
  }

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveData = () => {
    if (get(Object.keys(inventoryData), "length")) {
      const response = insertData({
        ...inventoryData,
        "TOTAL PRICE": totalPrice,
      });
      if (response) {
        handleClick();
      } else {
        alert("Fails");
      }
      dispatch(resetForm());
      sessionStorage.clear();
    } else alert("Inventory Form is Empty!!!");
  };

  return (
    <React.Fragment>
      <Typography variant="h4">Create Inventory</Typography>
      <Stack spacing={2}>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        ></Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[0]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[1]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[2]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[3]} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[4]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[5]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[6]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[7]} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[8]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[9]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[10]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[11]} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[12]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[13]} />
          </Grid>

          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[14]} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Form formData={DEFAULT_FORM[15]} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} lg={4}>
            <Form formData={DEFAULT_FORM[16]} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Form formData={DEFAULT_FORM[17]} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ padding: 3 }}>
              <Typography variant="h5">TOTAL PRICE</Typography>
              <Typography>$ {totalPrice}</Typography>
            </div>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={saveData}>
          Create
        </Button>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Inventory Created successfully
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default CreateInventory;
