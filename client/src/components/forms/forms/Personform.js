import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE} from "../../../queries";
import { useMutation} from "@apollo/client";

const Personform = () => {
  const [inputs, setInputs] = useState({});
  const [, forceUpdate] = useState()
  const [id] = useState(uuidv4())
  const [addPerson]=useMutation(ADD_PERSON)

  useEffect(() => {
    forceUpdate({});
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addPerson)
    const {firstName,lastName}=inputs
    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache,{data})=>{
        console.log(data)
        const persons = cache.readQuery({
          query: GET_PEOPLE
        });
        const newPerson = data.addPerson;
        console.log(cache.data)
cache.writeQuery({
  query: GET_PEOPLE,
  data: {
    ...persons,
    people: [...persons.people,newPerson]
  }
})


      },
      optimisticResponse: {
        __typename: 'Mutation',
        addPerson: {
          __typename: 'People',
          id,
          firstName,
          lastName
        }
      }
    })
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="form person">
      <h2>Person form</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Please enter your First Name
          <input
            type="text"
            onChange={handleChange}
            name="firstName"
            placeholder="Please enter your first name"
          />
        </label>
        <label>
          Please enter your Last name
          <input
            type="text"
            onChange={handleChange}
            name="lastName"
            placeholder="Please enter your last name"
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Personform;
