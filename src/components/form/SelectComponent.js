import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { get } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateForm } from "../../store/slices/InventorySlice";

const SelectComponent = (props = {}) => {
  const { label, valueKey } = props;

  const selectedValue = useSelector(({ inventory }) =>
    get(inventory, valueKey, "")
  );

  const generateMenuItems = () => {
    let { menuItems = [] } = props;
    return menuItems.map((menu) => (
      <MenuItem key={menu} value={menu}>
        {menu}
      </MenuItem>
    ));
  };

  const menuItems = generateMenuItems();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    const payload = { valueKey, value };
    if (valueKey === "OUTRIGHT/EXCHANGE/FLAT") {
      dispatch(updateForm(payload));
      dispatch(updateForm({ value: null, valueKey: "CORE CHARGES" }));
    } else {
      dispatch(updateForm(payload));
    }
  };

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel>{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue || ""}
        onChange={handleChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
