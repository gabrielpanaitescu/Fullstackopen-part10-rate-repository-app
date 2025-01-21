import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const getRepositories = async () => {
    setLoading(true);

    const response = await fetch("http://192.168.100.30:5000/api/repositories");
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    getRepositories();
  }, []);

  return { repositories, loading, refetch: getRepositories };
};

export default useRepositories;

export const useRepositoriesGQL = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        ...variables,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return {
    data,
    error,
    loading,
    handleFetchMore,
  };
};
