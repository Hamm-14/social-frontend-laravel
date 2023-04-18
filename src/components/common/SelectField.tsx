import React from "react";
import { Select, SelectProps, MenuItem } from "@mui/material";

export type Props = {
  label: string;
  data: string[];
} & SelectProps;
const SelectField: React.FC<Props> = ({ label, data, ...props }) => {
  return (
    <Select label={label} {...props}>
      {data?.map((name, index) => {
        return (
          <MenuItem key={index} value={`${name}`}>
            {name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectField;
