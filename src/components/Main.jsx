import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { RepositoryItem } from "./RepositoryList/RepositoryItem";

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route
          path="/repository/:id"
          element={<RepositoryItem altView></RepositoryItem>}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Main;
