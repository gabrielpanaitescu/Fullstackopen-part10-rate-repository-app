import { gql } from "@apollo/client";

const UserFragment = gql`
  fragment UserFragment on User {
    createdAt
    id
    reviewCount
    username
  }
`;

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
      user {
        ...UserFragment
      }
    }
  }

  ${UserFragment}
`;
