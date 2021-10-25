import { gql } from "apollo-server-core";
import { people, cars } from "./data";
import {filter} from 'lodash'

const typeDefs = gql`
  type People {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    personId: String
  }

  type Query {
    people: [People]
    car: [Car]
    personCars(id:String):[Car]
  }

  type Mutation{
addPerson(id:String,firstName:String,lastName:String):People
  }
`;
const resolvers = {
  Query: {
    people: () => people,
    car: () => cars,
    personCars:(parent,args,context,info)=>{
const items=filter(cars,{personId:args.id})
return items
    }
  },
  Mutation:{
addPerson:()=>people[0]
  }
};

export { typeDefs, resolvers };
