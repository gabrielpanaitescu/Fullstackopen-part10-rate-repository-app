import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-native";
import { ME } from "../graphql/queries";

export const useCurrentUser = () => {
  const location = useLocation();
  const [withReviews, setWithReviews] = useState(false);
  const { data, loading } = useQuery(ME, {
    fetchPolicy: "network-only",
    variables: {
      withReviews,
    },
  });

  useEffect(() => {
    if (withReviews && location.pathname !== "/my-reviews") {
      setWithReviews(false);
    }
  }, [location]);

  const getUserWithReviews = () => {
    setWithReviews(true);
  };

  return {
    data,
    loading,
    getUserWithReviews,
  };
};
