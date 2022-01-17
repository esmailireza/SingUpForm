import { useState } from "react";

const SingUpForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = ({ target }) => {
    setUserData({ ...userData, [target.name]: target.value });
  };

  const submitHandler = (e) => {
    console.log("dkfsf");
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            onChange={changeHandler}
            name="name"
            value={userData.name}
          />
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="text"
            onChange={changeHandler}
            name="email"
            value={userData.email}
          />
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            onChange={changeHandler}
            name="password"
            value={userData.password}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SingUpForm;
