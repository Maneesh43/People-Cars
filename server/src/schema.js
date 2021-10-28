import { gql } from "apollo-server-core";
import { people, cars } from "./data";
import { filter, find, remove } from "lodash";

const typeDefs = gql`
  type People {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    year: Int
    make: String
    model: String
    price: Float
    personId: String
  }

  type Query {
    people: [People]
    car: [Car]
    personCars(id: String): [Car]
    person(id: String): People
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): People
    addCar(
      id: String!
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    ): Car
    updateCar(
      id: String!
      year: Int
      make: String
      model: String
      price: Float
      personId: String
    ): Car
    updatePerson(id: String!, firstName: String, lastName: String): People
    removePerson(id: String!): People
    removeCar(id: String!): Car
  }
`;
const resolvers = {
  Query: {
    people: () => people,
    car: () => cars,
    personCars: (parent, args, context, info) => {
      const items = filter(cars, { personId: args.id });
      return items;
    },
    person: (parent, args, context, info) => {
      const person = find(people, { id: args.id });
      return person;
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPerson);
      return newPerson;
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id });

      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`);
      }

      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;
      return car;
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`);
      person.firstName = args.firstName;
      person.lastName = args.lastName;
      return person;
    },
    removePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`);
      remove(people, person);
      remove(cars, { personId: args.id });
      return person;
    },
    removeCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id ${args.id}`);
      remove(cars, car);
      return car;
    },
  },
};
export { typeDefs, resolvers };
