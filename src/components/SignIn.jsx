import { useFormik } from "formik";
import { Text } from "./ui/Text";
import { Pressable, TextInput, View } from "react-native";
import theme from "../theme";
import * as yup from "yup";

import { useNavigate } from "react-router-native";
import { useAuth } from "../hooks/useAuth";

import { formStyles as styles } from "../theme";

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

  const usernameValidationError =
    formik.touched.username && formik.errors.username;

  const passwordValidationError =
    formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={[
            styles.textInput,
            usernameValidationError && styles.errorBorder,
          ]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
        />
        {usernameValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          style={[
            styles.textInput,
            passwordValidationError && styles.errorBorder,
          ]}
          secureTextEntry
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />
        {passwordValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.submitPressable}>
        <Text fontWeight="bold" style={styles.submitText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const { signIn } = useAuth();

  const onSignIn = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return <SignInForm onSignIn={onSignIn} />;
};

export default SignIn;
