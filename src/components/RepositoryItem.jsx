import { StyleSheet, View } from "react-native";
import { Text } from "./Text";

export const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Start: {item.stargazersCount}</Text>
      <Text>Rating average:{item.ratingAverage}</Text>
      <Text>Review count: {item.reviewCount}</Text>
    </View>
  );
};
