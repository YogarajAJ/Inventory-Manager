import React from "react";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateForm } from "../../store/slices/InventorySlice";
import { FormControl } from "@mui/material";

const DateComponent = (props = {}) => {
  const { label, valueKey } = props;

  const reduxValue = useSelector(({ inventory }) =>
    get(inventory, valueKey, "")
  );

  const selectedValue = reduxValue ? new Date(reduxValue) : null;

  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    const value = `${
      newValue.getMonth() + 1
    }/${newValue.getDate()}/${newValue.getFullYear()}`;
    const payload = { valueKey, value };
    dispatch(updateForm(payload));
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          appea
          label={label}
          value={selectedValue}
          onChange={handleChange}
          renderInput={(params) => <TextField variant="filled" {...params} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default DateComponent;
