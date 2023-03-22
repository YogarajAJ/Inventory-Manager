import { InputAdornment, TextField } from "@mui/material";
import { get } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../store/slices/InventorySlice";

const TextFieldComponent = (props) => {
  let { label, valueKey, type, adornment, disabled = false } = props;

  const dispatch = useDispatch();

  const currentValue = useSelector(({ inventory }) =>
    get(inventory, valueKey, "")
  );
  const flatValue = useSelector(({ inventory }) =>
    get(inventory, "OUTRIGHT/EXCHANGE/FLAT", "")
  );

  if (valueKey === "CORE CHARGES" && flatValue) {
    disabled = valueKey === "CORE CHARGES" && flatValue === "OUTRIGHT";
  }

  const handleChange = (e) => {
    const { value } = e.target;
    const payload = { valueKey, value };
    dispatch(updateForm(payload));
  };

  const getAdornment = () => {
    switch (adornment) {
      case "USD":
        return {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        };
      default:
        return {};
    }
  };
  return (
    <TextField
      id="outlined-basic"
      variant="filled"
      fullWidth
      onChange={handleChange}
      type={type}
      label={label}
      value={currentValue || ""}
      InputProps={getAdornment()}
      disabled={disabled}
    />
  );
};

export default TextFieldComponent;
