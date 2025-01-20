import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY } from "../graphql/queries";

export const useRepository = (variables) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY_BY, {
    fetchPolicy: "cache-and-network",
    variables,
    onError(error) {
      console.log(error);
    },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    data,
    loading,
    handleFetchMore,
  };
};
