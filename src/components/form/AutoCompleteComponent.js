import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";
import { updateForm } from "../../store/slices/InventorySlice";

import { useDispatch, useSelector } from "react-redux";

const AutoCompleteComponent = ({
  options = [],
  label = "PART #",
  valueKey = "",
  defaultValue = "",
}) => {
  const dispatch = useDispatch();

  const updateRedux = (newInputValue) => {
    const payload = {
      valueKey,
      value: newInputValue,
    };
    dispatch(updateForm(payload));
  };

  const [value, setValue] = React.useState(defaultValue);
  const [inputValue, setInputValue] = React.useState(defaultValue);
  const reset = useSelector(({ inventory }) => inventory.toggleReset);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [reset, defaultValue]);

  const handleChange = (newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleValueChange = (newInputValue) => {
    setValue(newInputValue);
    updateRedux(newInputValue);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      value={value}
      key={label}
      autoSelect
      onChange={(event, newValue) => {
        handleValueChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        handleChange(newInputValue);
      }}
      options={options}
      renderInput={(params) => (
        <TextField key={label} {...params} label={label} />
      )}
    />
  );
};

export default AutoCompleteComponent;
