import React from "react";
import { Button } from "primereact/button";
import "./buttons.css";

const Buttons = ({
  label,
  icon,
  className,
  type = "button",
  onClick,
  loading,
  size,
  title,
  disabled,
  tooltip,
  severity,
}) => {
  return (
    <Button
      label={label}
      icon={icon}
      className={className}
      type={type}
      onClick={onClick}
      loading={loading ? loading : false}
      size={size ? size : "small"}
      title={title}
      // {...
      raised
      disabled={disabled}
      tooltip={tooltip}
      tooltipOptions={{ position: "bottom" }}
      severity={severity}
    />
  );
};

export default Buttons;
