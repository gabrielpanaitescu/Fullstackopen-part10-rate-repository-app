import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  searchBarStyles: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "white",
  },
});

const SearchBar = ({ setSearchKeyword }) => {
  const [value, setValue] = useState("");

  const [debouncedValue, { cancel }] = useDebounce(value, 500);

  useEffect(() => {
    setSearchKeyword(debouncedValue);

    return () => cancel();
  }, [debouncedValue]);

  return (
    <Searchbar
      onClearIconPress={() => {
        setSearchKeyword("");
        cancel();
      }}
      style={styles.searchBarStyles}
      placeholder="Search"
      value={value}
      onChangeText={setValue}
    />
  );
};

export default SearchBar;
