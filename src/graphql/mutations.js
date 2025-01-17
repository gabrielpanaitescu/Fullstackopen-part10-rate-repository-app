import { gql } from "@apollo/client";
import { UserFragment } from "./fragments";
import { ReviewFragment } from "./fragments";

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
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
