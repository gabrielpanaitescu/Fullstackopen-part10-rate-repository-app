import { gql } from "@apollo/client";
import { RepositoryFragment, ReviewFragment } from "./fragments";

export const GET_REPOSITORY_BY = gql`
  query GetRepositoryBy($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFragment
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          cursor
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
  query Me($withReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $withReviews) {
        edges {
          node {
            ...ReviewFragment
            repository {
              fullName
            }
          }
        }
      }
    }
  }

  ${ReviewFragment}
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
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
