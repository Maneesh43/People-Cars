import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;
export const GET_CARS = gql`
{
  car {
    id
    year
    make
    model
    price
    personId
  }
}
  `;
  
  export const GET_PERSON_CARS=gql`
  
  query Query($id: String) {
    personCars(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
  `;
  
  
