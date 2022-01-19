import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import * as Yup from "yup";
import Input from "./common/input";

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input label="name" name="name" formik={formik} />
        <Input label="email" name="email" formik={formik} />
        <Input label="phoneNumber" name="phoneNumber" formik={formik} />
        <Input
          label="password"
          name="password"
          formik={formik}
          type="password"
        />
        <Input
          label="passwordConfirm"
          name="passwordConfirm"
          formik={formik}
          type="password"
        />

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
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingUpForm;
