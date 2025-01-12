import { useFormik } from "formik";
import { Text } from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";

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
});

export const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text fontWeight="bold" style={styles.submitText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};
