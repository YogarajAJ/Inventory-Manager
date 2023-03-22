import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { read, utils } from "xlsx";
import { insertMultipleData } from "../services/FileService";
import CreateInventory from "./CreateInventory";

import template from "../assets/template.xlsx";
const AddInventory = () => {
  const [fileName, setFileName] = React.useState("");

  const validateFile = (name) => {
    if (name) {
      let fileExtension = "";
      if (name.lastIndexOf(".") > 0) {
        fileExtension = name.substring(name.lastIndexOf(".") + 1);
      }
      if (["xlsx", "xls"].includes(fileExtension)) {
        return true;
      } else {
        alert("You must select a .xls or .xlsx file for upload");
        return false;
      }
    }
  };

  const handleFilesChange = async (event) => {
    setFileName("");
    const file = event.target.files[0];
    const name = file.name;
    if (!validateFile(name)) {
      event.target.value = null;
      return null;
    }
    setFileName(name);
    const data = await file.arrayBuffer();

    const workBook = read(data);

    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(workSheet);

    insertMultipleData(jsonData);
    event.target.value = null;
  };
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "25vh" }}
      >
        <Grid>
          <Typography variant="h5">Create Bulk Data</Typography>
        </Grid>
        <Grid item>
          <div
            style={{
              padding: `10px 50px 10px 50px`,
            }}
          >
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFilesChange}
                accept=".xls,.xlsx"
              />
            </Button>
          </div>
        </Grid>
        <Grid item>
          <Typography align="center" fontWeight={600} color="secondary">
            Sample Template can be downloaded here!
            <Button href={template} download="SAMPLE_TEMPLATE">
              Download
            </Button>
          </Typography>
        </Grid>
        {fileName && (
          <Grid item xs={3}>
            <br />
            <Typography component="h6">
              File:
              <Typography component="span" color="red" fontWeight={600}>
                {fileName}
              </Typography>
              uploaded successfully.
            </Typography>
          </Grid>
        )}
      </Grid>
      <hr />
      <Container>
        <CreateInventory />
      </Container>
      <hr />
    </Container>
  );
};

export default AddInventory;
