import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY } from "../../graphql/queries";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import RepositoryInfo from "./RepositoryInfo";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Text } from "../ui/Text";
import theme from "../../theme";
import ReviewInfo from "../ReviewInfo";
import ItemSeparator from "../ui/ItemSeparator";

const styles = StyleSheet.create({
  openUrlText: {
    color: "white",
    textAlign: "center",
    gap: 10,
  },
  pressableContainer: {
    backgroundColor: "white",
    paddingBottom: 6,
  },
  openUrlPressable: {
    paddingVertical: 14,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.general,
    marginHorizontal: 14,
  },
  mainContainer: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgMain,
  },
  marginToReview: {
    marginBottom: 10,
  },
});

const SingleRepository = () => {
  const params = useParams();
  const id = params.id ? params.id : null;

  const { data, loading: loadingRepositoryData } = useQuery(GET_REPOSITORY_BY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
    },
    onError(error) {
      console.log(error);
    },
  });

  const repository = data?.repository;

  const reviews = data?.repository.reviews.edges.map((edge) => edge.node) ?? [];

  const onOpenUrl = () => {
    Linking.openURL(repository.url);
  };

  if (loadingRepositoryData) return <Text>Loading data</Text>;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ItemSeparatorComponent={<ItemSeparator />}
        data={reviews}
        renderItem={({ item }) => <ReviewInfo review={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.marginToReview}>
            <RepositoryInfo repository={repository} />
            <View style={styles.pressableContainer}>
              <Pressable onPress={onOpenUrl} style={styles.openUrlPressable}>
                <Text fontWeight="bold" style={styles.openUrlText}>
                  Open in GitHub
                </Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={<Text>No data found...</Text>}
      />
    </View>
  );
};

export default SingleRepository;
