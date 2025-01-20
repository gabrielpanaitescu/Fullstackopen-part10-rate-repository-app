import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { Text } from "./ui/Text";
import theme from "../theme";
import { Link, useLocation, useNavigation } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    // alt for SafeAreaProvider + SafeAreaView
    // paddingTop: StatusBar.currentHeight,

    backgroundColor: theme.colors.bgAppBar,
    paddingHorizontal: 14,
    paddingBottom: 10,
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

const AppBar = ({ currentUser, getUserWithReviews }) => {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.scrollViewContainer}>
          <Link to="/">
            <TabText title="Repositories" />
          </Link>
          {currentUser && (
            <>
              <Link to="/create-review">
                <TabText title="Create Review" />
              </Link>
              <Link to="/my-reviews" onPress={getUserWithReviews}>
                <TabText title="My reviews" />
              </Link>
            </>
          )}
          {!currentUser ? (
            <>
              <Link to="/signin">
                <TabText title="Sign In" />
              </Link>
              <Link to="/signup">
                <TabText title="Sign Up" />
              </Link>
            </>
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
