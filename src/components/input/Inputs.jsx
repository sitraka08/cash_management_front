import React, { useState } from "react";
import InputSelects from "./InputsSelect";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import "./Input.css";
import Loading from "../loading/Loading";

const Inputs = ({
  label,
  type = "text",
  register,
  // key,
  refer,
  error,
  // select
  control,
  name,
  required,
  optionValue,
  optionLabel,
  options,
  disabled = false,
  onInputChange,
  onChange = () => {},
  placeholder,
}) => {
  const [eye, setEye] = useState(true);
  if (type === "text") {
    return (
      <div className="flex w-full min-w-[100px] flex-col justify-end ">
        {label && (
          <label htmlFor={label} className="mb-1 text-[12px] text-zinc-700">
            {label} {required && <span className="text-red-700">*</span>}
            {disabled && <span className="text-primary">(Désactiver)</span>}
          </label>
        )}

        <input
          // key={key}
          type={type}
          className="input"
          {...register}
          disabled={disabled}
          placeholder={placeholder}
        />
        {error && <h4 className="error">{error}</h4>}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="flex w-full min-w-[100px] flex-col justify-end ">
        {label && (
          <label htmlFor={label} className="mb-1 text-[12px] text-zinc-700">
            {label} {required && <span className="text-red-700">*</span>}
          </label>
        )}

        <textarea
          className="input h-20"
          // key={key}
          spellCheck={false}
          {...register}
          placeholder={placeholder}
        ></textarea>
        {error && <h4 className="error">{error}</h4>}
      </div>
    );
  }

  if (type === "select") {
    return (
      <InputSelects
        name={name}
        control={control}
        required={required}
        optionValue={optionValue}
        optionLabel={optionLabel}
        placeholder={placeholder || label}
        options={options || []}
        label={label}
        error={error}
        className="back-input w-full"
        onInputChange={onChange}
      />
    );
  }

  if (type === "password") {
    return (
      <div className=" flex w-full min-w-[100px] flex-col justify-end overflow-hidden relative">
        {label && (
          <label htmlFor={label} className="mb-1 text-[12px] text-zinc-700">
            {label} {required && <span className="text-red-700">*</span>}
          </label>
        )}

        <div className=" w-full">
          <input
            ref={refer}
            // key={key}
            type={eye ? "password" : "text"}
            className="input w-full"
            {...register}
            placeholder={placeholder}
          />
          <button
            className="absolute bottom-[3px] right-1 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#F5F5F5]"
            type="button"
            onClick={() => setEye(!eye)}
          >
            {eye ? <FaRegEyeSlash size={20} /> : <FaRegEye size={17} />}
          </button>
        </div>

        {error && <h4 className="error">{error}</h4>}
      </div>
    );
  }
  return (
    <div className="flex w-full min-w-[100px] flex-col justify-end ">
      {label && (
        <label htmlFor={label} className="mb-1 text-[12px] text-zinc-700">
          {label} {required && <span className="text-red-700">*</span>}
        </label>
      )}

      <input
        ref={refer}
        // key={key}
        // onChange={onChange}
        type={type}
        className="input"
        {...register}
        disabled={disabled}
        placeholder={placeholder}
      />

      {error && <h4 className="error">{error}</h4>}
    </div>
  );
};

export default Inputs;
