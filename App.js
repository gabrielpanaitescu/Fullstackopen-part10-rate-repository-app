import { StatusBar } from "expo-status-bar";
import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorageContext from "./src/contexts/AuthStorageContext";
import AuthStorage from "./src/utils/authStorage";
import theme from "./src/theme";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={theme.colors.bgAppBar}
        barStyle="light-content"
      />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
