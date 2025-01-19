import { useFormik } from "formik";
import * as yup from "yup";
import theme, { formStyles as styles } from "../theme";
import { Pressable, Text, TextInput, View } from "react-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useAuth } from "../hooks/useAuth";

export const SignUpForm = ({ onSignUp }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      username: yup.string().required().min(5).max(30),
      password: yup.string().required().min(5).max(30),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "value does not match the password field")
        .required("password confirmation is a required field"),
    }),
    onSubmit: ({ passwordConfirm, ...user }) => {
      onSignUp(user);
    },
  });

  const usernameValidationError =
    formik.touched.username && formik.errors.username;

  const passwordValidationError =
    formik.touched.password && formik.errors.password;

  const passwordConfirmValidationError =
    formik.touched.passwordConfirm && formik.errors.passwordConfirm;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          style={[
            styles.textInput,
            usernameValidationError && styles.errorBorder,
          ]}
          placeholder="Username"
        />
        {usernameValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          style={[
            styles.textInput,
            passwordValidationError && styles.errorBorder,
          ]}
          placeholder="Password"
        />
        {passwordValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          secureTextEntry
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange("passwordConfirm")}
          onBlur={formik.handleBlur("passwordConfirm")}
          style={[
            styles.textInput,
            passwordConfirmValidationError && styles.errorBorder,
          ]}
          placeholder="Confirm password"
        />
        {passwordConfirmValidationError && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.passwordConfirm}
          </Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.submitPressable}>
        <Text style={styles.submitText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const { signIn } = useAuth();

  const onSignUp = (user) => {
    mutate({
      variables: {
        user,
      },
      onError: (error) => {
        console.log(error);
      },
      onCompleted: (_createdUser) => {
        signIn(user);
      },
    });
  };

  return <SignUpForm onSignUp={onSignUp} />;
};

export default SignUp;
