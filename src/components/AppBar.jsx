import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { Text } from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { useAuth } from "../hooks/useAuth";

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
  const { data, loading } = useQuery(ME);
  const { signOut } = useAuth();

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.scrollViewContainer}>
          <Link to={"/"}>
            <TabText title="Repositories" />
          </Link>
          {!data.me ? (
            <Link to={"/signin"}>
              <TabText title="Sign In" />
            </Link>
          ) : (
            <Pressable
              onPress={signOut}
              style={({ pressed }) => {
                return pressed ? { backgroundColor: "black" } : null;
              }}
            >
              <TabText title="Sign Out" />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
