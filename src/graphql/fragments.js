import { gql } from "@apollo/client";

// NOTE/TODO: missing user and repository fields
export const ReviewFragment = gql`
  fragment ReviewFragment on Review {
    id
    userId
    repositoryId
    rating
    createdAt
    text
    user {
      username
      id
    }
  }
`;

// NOTE/TODO: missing user and review fields // which are Object types. User and ReviewConnection
export const RepositoryFragment = gql`
  fragment RepositoryFragment on Repository {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    userHasReviewed
  }
`;

export const UserFragment = gql`
  fragment UserFragment on User {
    createdAt
    id
    reviewCount
    username
  }
`;
