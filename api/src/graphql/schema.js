const { gql } = require('apollo-server')

const typeDefs = gql`
type Dessert {
  id: ID!
  name: String!
  nutritionInfo: NutritionInfo!
  created: String!
}

input NewDessertInput {
  name: String!
  calories: Int!
  fat: Int!
  carbs: Int!
  protein: Int!
}

type NutritionInfo {
  calories: Int!
  fat: Int!
  carbs: Int!
  protein: Int!
}

type Query {
  desserts: [Dessert!]!
}

type Mutation {
  addDessert(input: NewDessertInput!): Dessert!
  deleteDesserts(ids: [String!]!): [String!]!
  resetDesserts: [Dessert!]!
}
`;

module.exports = typeDefs
