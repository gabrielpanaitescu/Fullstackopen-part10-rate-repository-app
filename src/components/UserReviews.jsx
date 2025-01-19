import { FlatList, View } from "react-native";
import ReviewInfo from "./ReviewInfo";

const ReviewInfoContainer = ({ review, children }) => {
  return <View>{children}</View>;
};

const UserReviews = ({ currentUser }) => {
  const reviews = currentUser.reviews?.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewInfoContainer review={item}>
          <ReviewInfo review={item} />
        </ReviewInfoContainer>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default UserReviews;
