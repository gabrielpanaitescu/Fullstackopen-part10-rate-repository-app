import { Formik } from "formik";
import * as yup from "yup";
import { formStyles as styles } from "../theme";
import { Alert, Pressable, Text, View } from "react-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useAuth } from "../hooks/useAuth";
import FormikTextInput from "./ui/FormikTextInput";
import { useState } from "react";

const validationSchema = yup.object({
  username: yup.string().required().min(5).max(30),
  password: yup.string().required().min(5).max(30),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "value does not match the password field")
    .required("password confirmation is a required field"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

export const SignUpForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <View>
        <FormikTextInput name={"username"} placeholder="Username" />
      </View>
      <View>
        <FormikTextInput
          name={"password"}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View>
        <FormikTextInput
          name={"passwordConfirm"}
          placeholder="Confirm passoword"
          secureTextEntry
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.submitPressable}>
        <Text style={styles.submitText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const { signIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSignUp = (user) => {
    mutate({
      variables: {
        user,
      },
      onError: (error) => {
        if (!error.message) {
          setErrorMessage("Unknown error");
        } else {
          setErrorMessage(error.message);
        }
        console.log(error);
      },
      onCompleted: (_createdUser) => {
        signIn(user);
      },
    });
  };

  const createErrorAlert = (message) => {
    setErrorMessage(null);
    return Alert.alert("Error!", message);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={({ passwordConfirm, ...user }) => {
          onSignUp(user);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm handleSubmit={handleSubmit} />}
      </Formik>

      {errorMessage && createErrorAlert(errorMessage)}
    </>
  );
};

export default SignUp;
