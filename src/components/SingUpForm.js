import { useFormik } from "formik";
import { useState } from "react/cjs/react.development";
import * as Yup from "yup";

const savedData = {
  name: "reza",
  email: "esmaili@gmail.com",
  phoneNumber: "09140000000",
  password: "12345",
  passwordConfirm: "12345",
  gender: "0",
};

const SingUpForm = () => {
  const [formValues, setFormValues] = useState(null);
  const formik = useFormik({
    initialValues: formValues || {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      gender: "",
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object({
      name: Yup.string()
        .required("name is required")
        .min(3, "Name length is not valid"),
      email: Yup.string()
        .email("invalid email format")
        .required("email is required"),
      phoneNumber: Yup.string()
        .required("phone Number is required")
        .matches(/^[0-9]{11}$/, "invalid phone number")
        .nullable(),
      password: Yup.string().required("password is required"),
      passwordConfirm: Yup.string()
        .required("passwordConfirm is required")
        .oneOf([Yup.ref("password"), null], "passwords must match"),
      gender: Yup.string().required("gender is required"),
    }),
    validateOnMount: true,
    enableReinitialize: true,
  });
  // console.log(formik.values);
  console.log(formik.errors);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input type="text" {...formik.getFieldProps("name")} name="name" />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="text" {...formik.getFieldProps("email")} name="email" />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>phone Number</label>
          <input
            type="text"
            {...formik.getFieldProps("phoneNumber")}
            name="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="formControl">
          <label>Password Confirmation</label>
          <input
            type="password"
            {...formik.getFieldProps("passwordConfirm")}
            name="passwordConfirm"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div className="error">{formik.errors.passwordConfirm}</div>
          )}
        </div>
        <div className="formControl">
          <input
            type="radio"
            id="0"
            name="gender"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">Male</label>

          <input
            type="radio"
            id="1"
            name="gender"
            value="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">Female</label>
          {formik.errors.gender && formik.touched.gender && (
            <div className="error">{formik.errors.gender}</div>
          )}
        </div>
        <button onClick={() => setFormValues(savedData)}>Load Data</button>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingUpForm;
