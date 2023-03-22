import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid
} from "@mui/material";
import React from "react";
import { queryData } from "../../services/InventoryService";
import AutoCompleteComponent from "../form/AutoCompleteComponent";

import { useDispatch, useSelector } from "react-redux";
import { exportAll } from "../../services/FileService";
import {
  resetForm,
  setInventoryTableData
} from "../../store/slices/InventorySlice";
import { updateLoader } from "../../store/slices/LoaderSlice";

const SearchComponent = ({
  altPartNumbers = [],
  partNumbers = [],
  description = [],
}) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(true);

  const inventoryData = useSelector(({ inventory }) => inventory.tableData);
  const allInventoryData = useSelector(({ inventory }) => inventory.data);
  const searchKey = useSelector(({ inventory }) => inventory.search);

  const onSearch = async () => {
    dispatch(updateLoader(true));
    const response = await queryData(
      searchKey?.partNumber,
      searchKey?.altPartNumber,
      searchKey?.description,
      checked
    );
    dispatch(setInventoryTableData(response));
    setTimeout(() => dispatch(updateLoader(false)), 200);
  };

  const onReset = async () => {
    resetFormData();
    const response = await queryData("", "", "", false);
    dispatch(setInventoryTableData(response));
  };

  const handleChangeCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  const exportAllHandler = () => {
    exportAll(allInventoryData);
  };

  const exportTableDataHandler = () => {
    exportAll(inventoryData);
  };

  const resetFormData = () => {
    dispatch(resetForm());
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} lg={3}>
          <AutoCompleteComponent
            options={partNumbers}
            label="Part #"
            valueKey="search.partNumber"
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <AutoCompleteComponent
            options={altPartNumbers}
            label="ALT Part #"
            valueKey="search.altPartNumber"
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <AutoCompleteComponent
            options={description}
            label="Description"
            valueKey="search.description"
          />
        </Grid>
        <Grid item xs={12} lg={2}>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleChangeCheckBox} />
            }
            label="Exlcude Expired"
          />
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item lg={4} xs={12} align="center">
          <Button fullWidth variant="contained" size="large" onClick={onSearch}>
            Search
          </Button>
        </Grid>

        <Grid item lg={2} xs={12} align="left">
          <Button size="large" onClick={onReset}>
            Reset
          </Button>
        </Grid>

        <Grid item lg={2} xs={12} align="left">
          <Button size="large" onClick={exportTableDataHandler}>
            Export Table Data
          </Button>
        </Grid>
        <Grid item lg={2} xs={12} align="left">
          <Button size="large" onClick={exportAllHandler}>
            Export All Data
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SearchComponent;
