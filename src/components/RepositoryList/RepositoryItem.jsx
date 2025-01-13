import { StyleSheet, View, Image } from "react-native";
import { Text } from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  container: {
    backgroundColor: "white",
    padding: 14,
    gap: 10,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 20,
  },
  descriptionContainer: {
    gap: 5,
    alignItems: "flex-start",
  },
  languageText: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "white",
    borderRadius: 4,
    textAlign: "center",
  },
  statGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  statContainer: {
    alignItems: "center",
    gap: 4,
  },
});

const StatContainer = ({ title, stat }) => {
  return (
    <View style={styles.statContainer}>
      <Text fontWeight="bold">{stat}</Text>
      <Text color="textSecondary">{title}</Text>
    </View>
  );
};

export const RepositoryItem = ({ item }) => {
  const decimalTransform = (string) => {
    const number = Number(string);

    if (number > 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return string;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.descriptionContainer}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.statGroupContainer}>
        <StatContainer
          title={"Stars"}
          stat={decimalTransform(item.stargazersCount)}
        />
        <StatContainer
          title={"Forks"}
          stat={decimalTransform(item.forksCount)}
        />

        <StatContainer
          title={"Reviews"}
          stat={decimalTransform(item.reviewCount)}
        />
        <StatContainer
          title={"Rating"}
          stat={decimalTransform(item.ratingAverage)}
        />
      </View>
    </View>
  );
};
