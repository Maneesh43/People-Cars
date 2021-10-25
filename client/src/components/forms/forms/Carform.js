import {useState} from 'react'
import {useQuery} from '@apollo/client'
import { GET_CARS } from '../../../queries';
const Carform = () => {
  const {loading,error,data}=useQuery(GET_CARS)
  console.log(data)
  const [inputs, setInputs] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
  };

const handleChange=(event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setInputs((values) => ({ ...values, [name]: value }));
}


  return (
    <div className="car form" >
      <h2>Car Form</h2>
      <form onSubmit={handleSubmit}
      style={{display:'flex',
    flexFlow:'column nowrap',

    }}
      >
        <label>
          Please enter car year:
          <input required type="number" min="1900" max="2021" name="year" onChange={handleChange} placeholder="Please enter car year"/>
        </label>

        <label>
          Please enter car make:
          <input type="text" required onChange={handleChange} name="make" placeholder="Please enter car make"/>
        </label>

        <label>
          Please enter car model:
          <input type="text" required onChange={handleChange} name="model" placeholder="Please enter car model"/>
        </label>

        <label>
          Please enter car price:
          <input type="number" required onChange={handleChange} name="price" placeholder="Please enter car price"/>
        </label>

        <label>
          Please select personid
          <select onChange={()=>{}} name="personId">
            <option value="1">1</option>

            <option value="2">2</option>
          </select>
        </label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Carform;
