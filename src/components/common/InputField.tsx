import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export type Props = {
  label?: string;
} & TextFieldProps;
const InputField: React.FC<Props> = ({ label, ...props }) => {
  return <TextField label={label} {...props} />;
};

export default InputField;
