import { Picker } from "@react-native-picker/picker";

export const orderOptions = [
  {
    label: "Latest Repositories",
    value: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  },
  {
    label: "Highest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    },
  },
  {
    label: "Lowest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    },
  },
];

export const OrderPicker = ({
  selectedOrderOption,
  setSelectedOrderOption,
}) => {
  return (
    <Picker
      selectedValue={selectedOrderOption}
      onValueChange={(value) => {
        setSelectedOrderOption(value);
      }}
    >
      <Picker.Item
        label="Select an option..."
        value="Select an option..."
        enabled={false}
      />
      {orderOptions.map(({ label, value }) => (
        <Picker.Item key={label} label={label} value={value} />
      ))}
    </Picker>
  );
};

export default OrderPicker;
