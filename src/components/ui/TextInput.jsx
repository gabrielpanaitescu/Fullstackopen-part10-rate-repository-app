import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#333",
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.general,
  },

  errorBorder: {
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
});

const TextInput = ({ showError, style, ...props }) => {
  const textInputStyles = [
    styles.textInput,
    style,
    showError && styles.errorBorder,
  ];

  return <NativeTextInput {...props} style={textInputStyles} />;
};

export default TextInput;
