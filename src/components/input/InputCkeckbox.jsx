import React from "react";
import { Checkbox } from "primereact/checkbox";
import "./InputCkeckbox.css";

const InputCkeckbox = ({ onChange, checked, value, name, label }) => {
  return (
    <div className="flex items-center">
      <Checkbox
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        required={true}
      />
      <label htmlFor={name} className="ml-2">
        {label}
      </label>
    </div>
  );
};

export default InputCkeckbox;
