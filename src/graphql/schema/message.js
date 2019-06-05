import { gql } from 'apollo-server';

// The GraphQL schema
export const messageSchema = gql`
  type Query {
    getAllLocations: [Location]!
    getOneLocation(id: ID!): Location
  }
    type Location {
      id: ID!
      location: String
      male_population: Int
      female_population: Int
      total_population: Int
      parent_location: String
    }

    type Mutation {
      # if false, Location fails to create -- check errors
      createLocation(
        location: String
        male_population: Int,
        female_population: Int, 
        total_population: Int, 
        parent_location: String, 
        ): Location!
    
      # if false, cancellation failed -- check errors
      updateLocation(
        id: ID
        location: String
        male_population: Int
        female_population: Int
        total_population: Int
        parent_location: String ): Location!

      # if false, cancellation failed -- check errors
      deleteLocation(id: ID): Location!
    }
  
    type LocationUpdateResponse {
      success: Boolean
      message: String
      getOneLocation: Location!
    }

`;
