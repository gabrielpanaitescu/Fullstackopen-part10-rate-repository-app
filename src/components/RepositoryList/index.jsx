import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import theme from "../../theme";
import { Text } from "../Text";
import useRepositories, {
  useRepositoriesGQL,
} from "../../hooks/useRepositories";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgMain,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleNavigateToRepo = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleNavigateToRepo(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListEmptyComponent={<Text>Loading data...</Text>}
      />
    </View>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositoriesGQL();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
