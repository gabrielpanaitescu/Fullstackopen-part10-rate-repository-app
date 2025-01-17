import { useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";

export const useAuth = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const [mutate] = useMutation(AUTHENTICATE);

  const signOut = async () => {
    await authStorage.removeAccessToken();

    apolloClient.resetStore();

    navigate("/");
  };

  const signIn = async (credentials) => {
    const { username, password } = credentials;

    const result = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(result.data.authenticate.accessToken);

    apolloClient.resetStore();

    navigate("/");

    return result;
  };

  return { signIn, signOut };
};
