import { Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ListItems from "./ListItems";
import { useMutation,useQuery} from "@apollo/client";
import { Delete } from "@mui/icons-material";
import {filter} from'lodash'
import { GET_PEOPLE, REMOVE_PERSON,GET_CARS} from "../../queries";
const PersonList = ({ data }) => {

const [removePerson] = useMutation(REMOVE_PERSON, {
  update(cache, { data: { removePerson } }) {
    const { people } = cache.readQuery({ query: GET_PEOPLE });
    cache.writeQuery({
      query: GET_PEOPLE,
      data: {
        people: filter(people, c => {
          return c.id !== removePerson.id
        })
      }
    })
  }
});

const handleDelete = (e,d) => {
  const {id,firstName,lastName} = d
removePerson({
    variables: {
      id
    },
    optimisticResponse: {
      __typename: 'Mutation',
      removePerson: {
        __typename: 'Person',
        id,
        firstName,
        lastName
      }
    }
  })


}

  return (
    <>
      {data.people.map((d) => {
        return (
          <>
            <ListItems
              item={d.firstName}
              last={false}
              key={d.id + d.firstName}
              id={d.id}
              dat={d}
              type="firstName"
            />
            <ListItems
              item={d.lastName}
              last={true}
              key={d.id + d.lastName}
              id={d.id}
              dat={d}
              type="lastName"
            />
            <div className="links">
            <Link to={`/person/${d.id}`}>Learn more</Link>
       <IconButton onClick={(e)=>handleDelete(e,d)}>
       <Delete

       />
       </IconButton>
            </div>
           
    
            <Divider />
          </>
        );
      })}
    </>
  );
};
export default PersonList;
