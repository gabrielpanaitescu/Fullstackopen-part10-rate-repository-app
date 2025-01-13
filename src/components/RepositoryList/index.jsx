import { FlatList, View, StyleSheet } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import theme from "../../theme";
import { Text } from "../Text";
import useRepositories, {
  useRepositoriesGQL,
} from "../../hooks/useRepositories";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../../graphql/queries";

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

const RepositoryList = () => {
  const { repositories } = useRepositoriesGQL();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListEmptyComponent={<Text>No data to display</Text>}
      />
    </View>
  );
};

export default RepositoryList;
