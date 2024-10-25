import ReactSelect from "react-select";
import "./InputSelects.css";
import { Controller } from "react-hook-form";

// RETURN OBJECT

const InputSelects = ({
  label,
  required,
  hidelabel,
  id,
  error,
  placeholder,
  optionValue,
  optionLabel,
  name,
  control,
  options,
  onInputChange,
}) => {
  const noData = () => {
    return <p className="text-xs">Aucun données</p>;
  };

  return (
    <span className="inputsContainer w-full">
      {hidelabel || (
        <label htmlFor={id} className="text-[12px]  text-zinc-700">
          {label}
          {required && <span className="text-error text-[13px]"> *</span>}
        </label>
      )}
      <div className="w-full">
        <Controller
          control={control}
          name={name}
          rules={{ required: required }}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <ReactSelect
              ref={ref}
              onChange={(val) => {
                onChange(val);
                onInputChange({ name, value: val?.value, label: val?.label });
              }}
              onBlur={onBlur}
              value={value}
              name={name}
              noOptionsMessage={noData}
              placeholder={placeholder || "Selectionner"}
              options={options}
              getOptionLabel={(val) => {
                return val[optionLabel] || val.label;
              }}
              getOptionValue={(val) => {
                return val[optionValue] || val.value;
              }}
            />
          )}
        />

        <h4 className="error">{error}</h4>
      </div>
    </span>
  );
};

export default InputSelects;
