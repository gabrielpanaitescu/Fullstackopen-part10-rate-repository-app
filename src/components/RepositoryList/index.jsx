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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgMain,
  },
});

export const RepositoryListContainer = ({
  repositories,
  selectedOrderOption,
  setSelectedOrderOption,
}) => {
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
        ListHeaderComponent={
          <OrderPicker
            selectedOrderOption={selectedOrderOption}
            setSelectedOrderOption={setSelectedOrderOption}
          />
        }
        data={repositoryNodes}
        ItemSeparatorComponent={<ItemSeparator />}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleNavigateToRepo(item.id)}>
            <RepositoryInfo repository={item} />
          </Pressable>
        )}
        ListEmptyComponent={<Text>Loading data...</Text>}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0].value
  );

  const { repositories } = useRepositoriesGQL(selectedOrderOption);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrderOption={selectedOrderOption}
      setSelectedOrderOption={setSelectedOrderOption}
    />
  );
};

export default RepositoryList;
