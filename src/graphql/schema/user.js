import { gql } from 'apollo-server';

// The GraphQL schema
export const userSchema = gql`
  type Query {
    # Queries for the current user
    user: User
  }

    type User {
      id: ID!
      name: String
      email: String!
      role: String
    }

    type Mutation {
      signup(name: String, email: String!, role: String!, password: String!): UserUpdateResponse
      login(email: String!, password: String!): UserUpdateResponse # login token
    }

    type UserUpdateResponse {
      success: Boolean
      message: String
      user: [User]
    }
`;
