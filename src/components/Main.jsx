import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SingleRepository from "./RepositoryList/SingleRepository";
import ReviewForm from "./RepositoryList/CreateReview";
import SignUp from "./SignUp";

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route
          path="/repository/:id"
          element={<SingleRepository></SingleRepository>}
        />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Main;
