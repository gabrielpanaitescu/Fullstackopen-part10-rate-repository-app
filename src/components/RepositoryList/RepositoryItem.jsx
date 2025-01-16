import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "../Text";
import theme from "../../theme";
import { decimalTransform } from "../../utils/decimalTransform";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY } from "../../graphql/queries";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

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
  openUrlContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 4,
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

export const RepositoryItem = ({ item, altView }) => {
  const params = useParams();
  const id = params.id ? params.id : null;

  const { data, loading } = useQuery(GET_REPOSITORY_BY, {
    variables: {
      id,
    },
    skip: !Boolean(altView),
    onError(e) {
      console.log(e);
    },
  });

  if (loading) return null;

  const itemToRender = altView ? data.repository : item;

  const onOpenUrl = () => {
    if (!altView) return null;

    Linking.openURL(itemToRender.url);
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.rowContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: itemToRender.ownerAvatarUrl,
          }}
        />
        <View style={styles.descriptionContainer}>
          <Text fontWeight="bold">{itemToRender.fullName} </Text>
          <Text color="textSecondary">{itemToRender.description}</Text>
          <Text style={styles.languageText}>{itemToRender.language}</Text>
        </View>
      </View>

      <View style={styles.statGroupContainer}>
        <StatContainer
          title={"Stars"}
          stat={decimalTransform(itemToRender.stargazersCount)}
        />
        <StatContainer
          title={"Forks"}
          stat={decimalTransform(itemToRender.forksCount)}
        />

        <StatContainer
          title={"Reviews"}
          stat={decimalTransform(itemToRender.reviewCount)}
        />
        <StatContainer
          title={"Rating"}
          stat={decimalTransform(itemToRender.ratingAverage)}
        />
      </View>
      {altView && (
        <Pressable onPress={onOpenUrl} style={styles.openUrlContainer}>
          <Text fontWeight="bold" style={styles.openUrlText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};
