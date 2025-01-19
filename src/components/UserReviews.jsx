import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import ReviewInfo from "./ReviewInfo";
import { Link } from "react-router-native";
import { Text } from "./ui/Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: theme.borderRadius.general,
  },
  viewRepoLink: {
    backgroundColor: theme.colors.primary,
  },
  deleteReviewPressable: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewContainer = ({ review, children }) => {
  const [deleteReviewMutation] = useMutation(DELETE_REVIEW, {
    variables: {
      id: review.id,
    },
    refetchQueries: ["Me"],
    onError: (error) => console.log(error),
  });

  const showDeleteConfirmationAlert = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: deleteReviewMutation,
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <>
      {children}
      <View style={styles.buttonContainer}>
        <Link
          to={`/repository/${review.repositoryId}`}
          style={[styles.button, styles.viewRepoLink]}
        >
          <Text style={{ color: "white" }} fontWeight="bold">
            View Repository
          </Text>
        </Link>
        <Pressable
          style={[styles.button, styles.deleteReviewPressable]}
          onPress={showDeleteConfirmationAlert}
        >
          <Text style={{ color: "white" }}>Delete Review</Text>
        </Pressable>
      </View>
    </>
  );
};

const UserReviews = ({ currentUser }) => {
  const reviews = currentUser.reviews?.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewContainer review={item}>
          <ReviewInfo review={item} hasRepoNameAsTitle={true} />
        </ReviewContainer>
      )}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Text>No reviews given yet</Text>}
    />
  );
};

export default UserReviews;
