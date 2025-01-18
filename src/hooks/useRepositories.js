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

export const useRepositoriesGQL = (order) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: order.props ? order.props : null,
  });

  const repositories = data?.repositories;

  return {
    repositories,
    error,
    loading,
  };
};
