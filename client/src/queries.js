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
  `
  export const ADD_PERSON = gql`
  
  mutation AddPersonMutation($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
  `

export const ADD_CAR = gql`mutation Mutation($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
  addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
    id
    year
    make
    model
    price
    personId
  }
}`

  export const UPDATE_CAR = gql`

  mutation UpdateCarMutation($updateCarId: String!, $year: Int, $make: String, $model: String, $price: Float, $personId: String) {
    updateCar(id: $updateCarId, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
  `
  export const UPDATE_PERSON = gql`mutation UpdatePersonMutation($updatePersonId: String!, $firstName: String, $lastName: String) {
    updatePerson(id: $updatePersonId, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
mutation RemovePersonMutation($removePersonId: String!) {
  removePerson(id: $removePersonId) {
    id
    firstName
    lastName
  }
}
`

export const REMOVE_CAR = gql`
mutation RemovePersonMutation($removeCarId: String!) {
  removeCar(id: $removeCarId) {
    id
    year
    make
    model
    price
    personId
  }
}`

export const PERSON_WITH_ID=gql`
query Query($id: String) {
  person(id: $id) {
    id
    firstName
    lastName
  }
}
`
  ;
  
  
