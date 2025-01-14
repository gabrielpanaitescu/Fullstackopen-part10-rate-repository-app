import { useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";

export const useAuth = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const [mutate] = useMutation(AUTHENTICATE);

  const signOut = async () => {
    await authStorage.removeAccessToken();

    apolloClient.resetStore();
  };

  const signIn = async (credentials) => {
    const { username, password } = credentials;

    const result = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(result.data.authenticate.accessToken);

    apolloClient.resetStore();

    return result;
  };

  return { signIn, signOut };
};
