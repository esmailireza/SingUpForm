import React from "react";

const RadioInput = ({ name, formik, radioOptions }) => {
  return (
    <div className="formControl">
      {radioOptions.map((item) => {
        return (
          <React.Fragment key={item.value}>
            <input
              type="radio"
              id={item.value}
              name={name}
              value={item.value}
              onChange={formik.handleChange}
              checked={formik.values[name] === item.value}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RadioInput;
