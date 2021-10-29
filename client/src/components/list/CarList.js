import { Divider, IconButton } from "@mui/material";
import { REMOVE_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
import ListItems from "./ListItems";
import { Delete } from "@mui/icons-material";
import { useMutation, useQuery } from "@apollo/client";
import { filter } from "lodash";
import {gql} from '@apollo/client'
const CarList = ({ data }) => {
  console.log(data)
  const cars=useQuery(GET_CARS)
  const [removeCar] = useMutation(REMOVE_CAR, {

      update(cache, {data}) {
        const { car } = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            car: filter(car, c => {
              return c.id !== data.removeCar.id
            })
          }
        })
      }
  });
  const handleDelete = (e, d) => {
    const {id,make,model,price,personId,year}=d
    const a=removeCar({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        removeCar: {
          __typename: 'Car',
          id,
          make,
          model,
          year,
          price,
          personId
        }
      }
    })  
    
  };
  return (
    <>
      {data.car.map((d,i) => {
        return (
          <>
            <ListItems
              item={d.year}
              last={false}
              key={d.year}
              dat={d}
              type={"year"}
              key={d.year+d.id+i}
            />
            <ListItems
              item={d.make}
              last={false}
              key={d.make}
              dat={d}
              type={"make"}
              key={d.make+d.id+i}
            />
            <ListItems
              item={d.model}
              last={false}
              key={d.model}
              dat={d}
              type={"model"}
              key={d.model+d.id+i}
            />
            <ListItems
              item={d.price}
              last={false}
              key={d.price}
              dat={d}
              type={"price"}
              key={d.price+d.id+i}
            />
            <ListItems
              item={d.personId}
              last={false}
              key={d.personId}
              dat={d}
              type={"personId"}
              key={d.personId+d.id+i}
            />
            <IconButton key={d.id+i} onClick={(e) => handleDelete(e, d)}>
              <Delete />
            </IconButton>
            <Divider />
          </>
        );
      })}
    </>
  );
};

export default CarList;
