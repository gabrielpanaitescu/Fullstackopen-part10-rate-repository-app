import { useField } from "formik";
import { StyleSheet } from "react-native";

import TextInput from "./TextInput";
import { Text } from "./Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    marginTop: 2,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [_field, meta, helpers] = useField(name);

  const { value, error } = meta;
  const { setValue, setTouched } = helpers;

  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        onBlur={() => setTouched(true)}
        showError={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default FormikTextInput;
