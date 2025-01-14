import { useFormik } from "formik";
import { Text } from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";
import * as yup from "yup";
import useSignin from "../hooks/useSignin";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 14,
    gap: 10,
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#333",
    paddingHorizontal: 10,
  },
  submitText: {
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    paddingVertical: 18,
    color: "white",
  },
  borderColorError: {
    borderColor: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const SignIn = () => {
  const [signIn, result] = useSignin();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const { data } = await signIn({ username, password });
        console.log("data", data);

        navigate("/");
      } catch (error) {
        console.log("error", error);
      }
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
      <Pressable onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.submitText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
