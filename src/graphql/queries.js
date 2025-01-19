import { gql } from "@apollo/client";
import { RepositoryFragment, ReviewFragment } from "./fragments";

export const GET_REPOSITORY_BY = gql`
  query GetRepositoryBy($id: ID!) {
    repository(id: $id) {
      ...RepositoryFragment
      reviews {
        edges {
          node {
            ...ReviewFragment
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${ReviewFragment}
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
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
