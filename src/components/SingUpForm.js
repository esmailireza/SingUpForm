import { useFormik } from "formik";

const SingUpForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => console.log(values),
  });
  console.log(formik.values);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            onChange={formik.handleChange}
            name="name"
            value={formik.values.name}
          />
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="text"
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
          />
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SingUpForm;
