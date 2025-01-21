import { Text } from "./ui/Text";
import { Alert, Pressable, View } from "react-native";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { Formik } from "formik";
import { formStyles as styles } from "../theme";
import { useState } from "react";
import FormikTextInput from "./ui/FormikTextInput";

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const initialValues = {
  username: "",
  password: "",
};

export const SignInForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <View>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.submitPressable}>
        <Text fontWeight="bold" style={styles.submitText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const { signIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSignIn = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });

      return data;
    } catch (error) {
      if (!error.message) {
        setErrorMessage("Unknown error");
      } else {
        setErrorMessage(error.message);
      }
      console.log("error", error);
    }
  };

  const createErrorAlert = (message) => {
    setErrorMessage(null);
    return Alert.alert("Error!", message);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onSignIn(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
      </Formik>

      {errorMessage && createErrorAlert(errorMessage)}
    </>
  );
};

export default SignIn;
