import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Text } from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.bgAppBar,
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  tabText: {
    color: "white",
  },
  scrollViewContainer: {
    flexDirection: "row",
    gap: 14,
  },
});

const TabText = ({ title }) => {
  return (
    <Text
      color="textPrimary"
      fontSize="subheading"
      fontWeight="bold"
      style={styles.tabText}
    >
      {title}
    </Text>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.scrollViewContainer}>
          <Link to={"/"}>
            <TabText title="Repositories" />
          </Link>
          <Link to={"/signin"}>
            <TabText title="Sign In" />
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
