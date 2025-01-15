import { FlatList, View, StyleSheet } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import theme from "../../theme";
import { Text } from "../Text";
import useRepositories, {
  useRepositoriesGQL,
} from "../../hooks/useRepositories";

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
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
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
