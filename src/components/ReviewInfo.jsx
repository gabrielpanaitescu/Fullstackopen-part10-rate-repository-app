import { StyleSheet, View } from "react-native";
import { Text } from "./ui/Text";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    gap: 10,
    padding: 12,
  },
  ratingContainer: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40 / 2,
  },
  descriptionContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  bodyText: {
    marginTop: 5,
  },
});

const ReviewInfo = ({ review, hasRepoNameAsTitle }) => {
  console.log(review);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text fontWeight="bold">
          {hasRepoNameAsTitle
            ? review.repository.fullName
            : review.user.username}
        </Text>
        <Text color="textSecondary">
          {format(review.createdAt, "dd.MM.yyyy")}
        </Text>
        <Text style={styles.bodyText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewInfo;
