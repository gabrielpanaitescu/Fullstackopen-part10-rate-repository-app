import { Platform, StyleSheet } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    bgAppBar: "#24292e",
    bgMain: "#e1e4e8",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 24,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  borderRadius: {
    general: 4,
  },
};

export const formStyles = StyleSheet.create({
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
  errorBorder: {
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
  submitPressable: {
    borderRadius: theme.borderRadius.general,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
  },
});

export default theme;
