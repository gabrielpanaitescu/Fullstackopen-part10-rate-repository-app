import { useFormik } from "formik";
import { Text } from "./ui/Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";
import * as yup from "yup";

import { useNavigate } from "react-router-native";
import { useAuth } from "../hooks/useAuth";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 14,
    gap: 10,
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#333",
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.general,
  },
  submitText: {
    textAlign: "center",
    color: "white",
  },
  borderColorError: {
    borderColor: theme.colors.error,
  },
  pressable: {
    borderRadius: theme.borderRadius.general,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const SignInForm = ({ onSignIn }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      onSignIn(values);
    },
    validationSchema,
  });

  const checkUsernameValidation =
    formik.touched.username && formik.errors.username;

  const checkPasswordValidation =
    formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          checkUsernameValidation && styles.borderColorError,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {checkUsernameValidation && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          checkPasswordValidation && styles.borderColorError,
        ]}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {checkPasswordValidation && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
        <Text fontWeight="bold" style={styles.submitText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSignIn = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      navigate("/");

      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return <SignInForm onSignIn={onSignIn} />;
};

export default SignIn;
