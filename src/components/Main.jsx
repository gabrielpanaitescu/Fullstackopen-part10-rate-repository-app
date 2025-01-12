import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { RepositoryList } from "./RepositoryList";
import { AppBar } from "./AppBar";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgMain,
  },
});

const Main = () => {
  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <RepositoryList />
      </View>
    </>
  );
};

export default Main;
