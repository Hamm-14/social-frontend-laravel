import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { IMAGES } from "../../assets";

const circularProgressStyle: React.CSSProperties = {
  color: "#FFFFFF",
};

interface ButtonProps {
  buttonName: string;
  onClick?: () => void;
  buttonStyle: React.CSSProperties;
  disabled?: boolean;
  isLoading?: boolean;
  outlineVariant?: boolean;
  isArrow?: boolean;
  arrowStyle?: React.CSSProperties;
}

const ButtonComponent = (props: ButtonProps) => {
  const {
    buttonName,
    onClick,
    buttonStyle,
    disabled,
    isLoading,
    outlineVariant,
    isArrow,
    arrowStyle,
  } = props;
  return (
    <Button
      variant={outlineVariant ? "outlined" : "contained"}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      color="secondary"
    >
      {!isLoading ? buttonName : <CircularProgress style={circularProgressStyle} size={20} />}
      {isArrow ? <img src={IMAGES.arrow_right} alt="logo" style={arrowStyle} /> : null}
    </Button>
  );
};

export default ButtonComponent;
