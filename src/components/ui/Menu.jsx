import * as React from "react";
import { View } from "react-native";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import { Text } from "./Text";

const MenuComponent = ({ onChangeOrder }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handlePress = (values) => {
    onChangeOrder(values);
    closeMenu();
  };

  return (
    <PaperProvider>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "start",
          marginLeft: 10,
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>
              <Text fontWeight="bold">Order by 🔽</Text>
            </Button>
          }
        >
          <Menu.Item
            onPress={() =>
              handlePress({ orderBy: "CREATED_AT", orderDirection: "DESC" })
            }
            title="Latest Repositories"
          />
          {/* <Menu.Item
            onPress={() =>
              handlePress({ orderBy: "CREATED_AT", orderDirection: "ASC" })
            }
            title="Oldest Repositories"
          /> */}
          <Divider />
          <Menu.Item
            onPress={() =>
              handlePress({
                orderBy: "RATING_AVERAGE",
                orderDirection: "DESC",
              })
            }
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={() =>
              handlePress({
                orderBy: "RATING_AVERAGE",
                orderDirection: "ASC",
              })
            }
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default MenuComponent;
