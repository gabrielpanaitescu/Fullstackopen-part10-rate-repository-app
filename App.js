import { StatusBar } from "expo-status-bar";
import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
};

export default App;
