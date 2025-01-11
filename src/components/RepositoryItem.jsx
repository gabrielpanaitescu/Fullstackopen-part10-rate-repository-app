import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text style={styles.text}>Full name: {item.fullName}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      <Text style={styles.text}>Language: {item.language}</Text>
      <Text style={styles.text}>Forks: {item.forksCount}</Text>
      <Text style={styles.text}>Start: {item.stargazersCount}</Text>
      <Text style={styles.text}>Rating average:{item.ratingAverage}</Text>
      <Text style={styles.text}>Review count: {item.reviewCount}</Text>
    </View>
  );
};
