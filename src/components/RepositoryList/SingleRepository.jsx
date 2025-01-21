import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import RepositoryInfo from "./RepositoryInfo";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Text } from "../ui/Text";
import theme from "../../theme";
import ReviewInfo from "../ReviewInfo";
import ItemSeparator from "../ui/ItemSeparator";
import { useRepository } from "../../hooks/useRepository";

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
  emptyText: {
    padding: 10,
    fontStyle: "italic",
  },
});

const SingleRepository = () => {
  const params = useParams();
  const id = params.id ? params.id : null;

  const variables = {
    id,
    first: 6,
  };

  const {
    data,
    loading: loadingRepositoryData,
    handleFetchMore,
  } = useRepository(variables);

  const repository = data?.repository;

  const reviews =
    data?.repository?.reviews?.edges.map((edge) => edge.node) ?? [];

  const onOpenUrl = () => {
    Linking.openURL(repository.url);
  };

  const handleEndReached = () => {
    handleFetchMore();
  };

  if (loadingRepositoryData) return null;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        onEndReached={handleEndReached}
        ItemSeparatorComponent={<ItemSeparator />}
        data={reviews}
        renderItem={({ item }) => <ReviewInfo review={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          repository && (
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
          )
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No data found...</Text>
        }
      />
    </View>
  );
};

export default SingleRepository;
