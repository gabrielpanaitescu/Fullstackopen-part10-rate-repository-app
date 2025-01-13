import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignin = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { credentials: { username, password } },
      fetchPolicy: "network-only",
    });

    return result;
  };

  return [signIn, result];
};

export default useSignin;
