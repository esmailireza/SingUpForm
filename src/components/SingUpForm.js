const SingUpForm = () => {
  return (
    <div>
      <form>
        <div className="formControl">
          <label>Name</label>
          <input type="text" />
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="text" />
        </div>
        <div className="formControl">
          <label>Password</label>
          <input type="text" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SingUpForm;
