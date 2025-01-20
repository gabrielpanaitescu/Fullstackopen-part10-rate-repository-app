import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryInfo from "./RepositoryInfo";
import theme from "../../theme";
import { Text } from "../ui/Text";
import useRepositories, {
  useRepositoriesGQL,
} from "../../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import ItemSeparator from "../ui/ItemSeparator";
import { useState } from "react";
import OrderPicker, { orderOptions } from "../ui/OrderPicker";
import SearchBar from "../ui/SearchBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgMain,
  },
});

export const RepositoryListContainer = ({
  repositories,
  loadingRepositoriesData,
  selectedOrderOptions,
  setSelectedOrderOptions,
  setSearchKeyword,
  handleFetchMore,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleNavigateToRepo = (id) => {
    navigate(`/repository/${id}`);
  };

  const handleEndReached = () => {
    handleFetchMore();
  };

  return (
    <View style={styles.container}>
      <FlatList
        onEndReached={handleEndReached}
        ListHeaderComponent={
          <View>
            <SearchBar setSearchKeyword={setSearchKeyword} />
            <OrderPicker
              selectedOrderOptions={selectedOrderOptions}
              setSelectedOrderOptions={setSelectedOrderOptions}
            />
          </View>
        }
        data={repositoryNodes}
        ItemSeparatorComponent={<ItemSeparator />}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleNavigateToRepo(item.id)}>
            <RepositoryInfo repository={item} />
          </Pressable>
        )}
        ListEmptyComponent={
          loadingRepositoriesData ? (
            <Text>Loading data</Text>
          ) : (
            <Text>No data found...</Text>
          )
        }
      />
    </View>
  );
};

const RepositoryList = () => {
  const [selectedOrderOptions, setSelectedOrderOptions] = useState(
    orderOptions[0].value
  );
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    handleFetchMore,
    repositories,
    loading: loadingRepositoriesData,
  } = useRepositoriesGQL({ ...selectedOrderOptions, searchKeyword, first: 5 });

  return (
    <RepositoryListContainer
      repositories={repositories}
      loadingRepositoriesData={loadingRepositoriesData}
      selectedOrderOptions={selectedOrderOptions}
      setSelectedOrderOptions={setSelectedOrderOptions}
      setSearchKeyword={setSearchKeyword}
      handleFetchMore={handleFetchMore}
    />
  );
};

export default RepositoryList;
