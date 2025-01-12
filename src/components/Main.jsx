import { RepositoryList } from "./RepositoryList";
import { AppBar } from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import { SignIn } from "./SignIn";

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Main;
