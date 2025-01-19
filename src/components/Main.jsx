import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SingleRepository from "./RepositoryList/SingleRepository";
import ReviewForm from "./CreateReview";
import SignUp from "./SignUp";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import theme from "../theme";
import UserReviews from "./UserReviews";
import { useCurrentUser } from "../hooks/useCurrentUser";

const Main = () => {
  const { data, loading, getUserWithReviews } = useCurrentUser();

  if (loading) return null;

  const currentUser = data.me;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar
          backgroundColor={theme.colors.bgAppBar}
          barStyle="light-content"
        />
        <AppBar
          currentUser={currentUser}
          getUserWithReviews={getUserWithReviews}
        />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route
            path="/repository/:id"
            element={<SingleRepository></SingleRepository>}
          />
          <Route path="/create-review" element={<ReviewForm />} />
          <Route
            path="/my-reviews"
            element={<UserReviews currentUser={currentUser} />}
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Main;
