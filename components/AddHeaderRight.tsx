import { View, Text } from "react-native";
import Select from "./UI/Select";
import { useContext } from "react";
import { CardGroupContext } from "../store/CardGroup-Context";

function AddHeaderRight() {
  const cardGroupCtx = useContext(CardGroupContext);
  const options: any[] = [];
  cardGroupCtx.cardGroups.map((item) => {
    options.push({ value: item.id, label: item.name });
  });
  const handleSelect = (option: {}) => {
    console.log("Selected option:", option);
    cardGroupCtx.setHeaderData(option);
  };
  return (
    <View
      style={{
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={{ marginRight: 10, fontSize: 16 }}>选择牌组</Text>
      <Select options={options} onSelect={handleSelect} />
    </View>
  );
}
export default AddHeaderRight;
