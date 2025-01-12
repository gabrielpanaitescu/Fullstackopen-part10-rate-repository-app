import { View, StyleSheet, StatusBar, Pressable } from "react-native";
import Constants from "expo-constants";
import { Text } from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.bgAppBar,
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  header: {
    color: "white",
  },
});

export const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text
          color="textPrimary"
          fontSize="subheading"
          fontWeight="bold"
          style={styles.header}
        >
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};
