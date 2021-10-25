import { useState } from "react";

const Personform = () => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="form person">
      <h2>Person form</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Please enter your First Name
          <input type="text" onChange={handleChange} name="firstName" placeholder="Please enter your first name"/>
        </label>
        <label>
          Please enter your Last name
          <input type="text" onChange={handleChange} name="lastName" placeholder="Please enter your last name"/>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Personform;
