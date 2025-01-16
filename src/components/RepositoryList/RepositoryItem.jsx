import { StyleSheet, View, Image } from "react-native";
import { Text } from "../ui/Text";
import theme from "../../theme";
import { decimalTransform } from "../../utils/decimalTransform";

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.general,
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
    borderRadius: theme.borderRadius.general,
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
  openUrlContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: theme.borderRadius.general,
  },
  openUrlText: {
    color: "white",
    textAlign: "center",
  },
});

const StatContainer = ({ title, stat, ...props }) => {
  return (
    <View style={styles.statContainer}>
      <Text fontWeight="bold" {...props}>
        {stat}
      </Text>
      <Text color="textSecondary" {...props}>
        {title}
      </Text>
    </View>
  );
};

export const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.rowContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: repository.ownerAvatarUrl,
          }}
        />
        <View style={styles.descriptionContainer}>
          <Text fontWeight="bold">{repository.fullName} </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <Text style={styles.languageText}>{repository.language}</Text>
        </View>
      </View>

      <View style={styles.statGroupContainer}>
        <StatContainer
          title={"Stars"}
          stat={decimalTransform(repository.stargazersCount)}
        />
        <StatContainer
          title={"Forks"}
          stat={decimalTransform(repository.forksCount)}
        />

        <StatContainer
          title={"Reviews"}
          stat={decimalTransform(repository.reviewCount)}
        />
        <StatContainer
          title={"Rating"}
          stat={decimalTransform(repository.ratingAverage)}
        />
      </View>
    </View>
  );
};

export const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.rowContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.descriptionContainer}>
          <Text fontWeight="bold">{item.fullName} </Text>
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
