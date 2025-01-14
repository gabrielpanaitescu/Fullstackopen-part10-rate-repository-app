import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignin = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { credentials: { username, password } },
      fetchPolicy: "network-only",
    });

    await authStorage.setAccessToken(result.data.authenticate.accessToken);

    apolloClient.resetStore();

    return result;
  };

  return [signIn, result];
};

export default useSignin;
