import { gql } from "@apollo/client";
import { RepositoryFragment } from "./fragments";

export const GET_REPOSITORY_BY = gql`
  query GetRepositoryBy($id: ID!) {
    repository(id: $id) {
      ...RepositoryFragment
    }
  }

  ${RepositoryFragment}
`;

export const ME = gql`
  query {
    me {
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...RepositoryFragment
        }
      }
    }
  }

  ${RepositoryFragment}
`;
