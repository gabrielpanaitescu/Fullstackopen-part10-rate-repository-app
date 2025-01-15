import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
      },
      globals: {
        __DEV__: true, // Example React Native global variable
      },
    },
    plugins: {
      react,
      "react-native": reactNative,
      jest,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended?.rules,
      ...reactNative.configs.recommended?.rules,
      ...jest.configs.recommended?.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
    env: {
      "react-native/react-native": true,
      jest: true,
    },
  },
];
