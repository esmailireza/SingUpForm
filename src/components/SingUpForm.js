import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import * as Yup from "yup";
import CheckBoxInput from "./common/CheckBoxInput";
import Input from "./common/input";
import RadioInput from "./common/radioInput";
import SelectComponent from "./common/SelectComponent";
const checkBoxOptions = [
  { label: "React.js", value: "React.js" },
  { label: "Vue.js", value: "Vue.js" },
];

const radioOptions = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];

const selectOptions = [
  { label: "select nationality ...", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];

const onSubmit = (values) => {
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => res.data)
    .catch((err) => console.log(err));
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
      nationality: "",
      intrests: [],
      terms: false,
    },

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
      nationality: Yup.string().required("select is required"),
      intrests: Yup.array().min(1).required("at least select one experties"),
      terms: Yup.boolean()
        .required("The terms and conditions must be accepted.")
        .oneOf([true], "The terms and conditions must be accepted."),
    }),
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);
  //console.log(formik.values);
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
        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
        <SelectComponent
          selectOptions={selectOptions}
          name="nationality"
          formik={formik}
        />
        <CheckBoxInput
          formik={formik}
          checkBoxOptions={checkBoxOptions}
          name="intrests"
        />
        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          checked={formik.values.terms}
        />
        <label htmlFor="terms">Terms and Conditions</label>
        {formik.errors.terms && formik.touched.terms && (
          <div className="error">{formik.errors.terms}</div>
        )}
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingUpForm;
