import { useState, useEffect,useRef} from "react";
import { useQuery } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../../queries";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
const Carform = () => {
  const { loading, error, data } = useQuery(GET_CARS);
  const [inputs, setInputs] = useState({});
  const [, forceUpdate] = useState();
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const optionss = useQuery(GET_PEOPLE);
  useEffect(() => {
    forceUpdate({});
  }, []);

  if (optionss.loading) return <p>Loading...</p>;
  if (optionss.error) return <p>Error: {optionss.error.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    let personId;
    inputs.personId ? (personId = inputs.personId) : (personId = "1");
    const make = inputs.make;
    const model = inputs.model;
    const year = parseInt(inputs.year);
    const price = parseFloat(inputs.price) * 1.0;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data }) => {
        const cars = cache.readQuery({
          query: GET_CARS,
        });
        const newCar = data.addCar;
        console.log(newCar);
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...cars,
            car: [...cars.car, newCar],
          },
        });
      },
      optimisticResponse: {
        __typename: "Mutation",
        addCar: {
          __typename: "Car",
          id,
          make,
          model,
          price,
          year,
          personId,
        },
      },
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  return (

    <div className={(optionss.data.people.length<1)?"hideit":"car form"} >
      <h2>Car Form</h2>
      <form
      className='carform'
        onSubmit={handleSubmit}
        style={{ display: "flex", flexFlow: "column nowrap" }}
      >
        <label>
          Please enter car year:
          <input
            required
            type="number"
            min="1900"
            max="2021"
            name="year"
            onChange={handleChange}
            placeholder="Please enter car year"
          />
        </label>

        <label>
          Please enter car make:
          <input
            type="text"
            required
            onChange={handleChange}
            name="make"
            placeholder="Please enter car make"
          />
        </label>

        <label>
          Please enter car model:
          <input
            type="text"
            required
            onChange={handleChange}
            name="model"
            placeholder="Please enter car model"
          />
        </label>

        <label>
          Please enter car price:
          <input
            type="number"
            required
            onChange={handleChange}
            name="price"
            placeholder="Please enter car price"
          />
        </label>

        <label>
          Please select personid
          <select onChange={handleChange} name="personId">
            {optionss.data.people.map((e, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Carform;
