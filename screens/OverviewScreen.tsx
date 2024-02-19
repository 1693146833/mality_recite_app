import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/UI/Button";
import { CardGroupContext } from "../store/CardGroup-Context";
import OverviewCard from "../components/OverviewCard";
function OverviewScreen({ navigation }: { navigation: any }) {
  const [filtereddata, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  const cardGroupCtx = useContext(CardGroupContext);

  useEffect(() => {
    const allCard = cardGroupCtx.cardGroups.reduce(
      (pre, cur) =>
        pre.concat(
          cur?.cardList.map((item: any) => {
            const card = { ...item, group: cur.name, groupId: cur.id };
            //console.log(card);
            return card;
          })
        ),
      []
    );

    const handleSearch = (query: string = "") => {
      setInput(query);
      if (query.length > 3) {
        const newData = allCard.filter((item: any) => {
          const itemData = item.front.toUpperCase();
          const textData = query.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
      } else {
        setFilteredData(allCard);
      }
    };
    handleSearch(input);
  }, [input, setInput, cardGroupCtx.cardGroups]);

  function overviewCardPressHandler(id: string, groupId: string) {
    navigation.navigate("EditPage", { id: id, groupId: groupId });
  }
  //console.log(allCard);
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type here..."
          style={styles.input}
          multiline={true}
        />
        <Button
          backgroundColor="transparent"
          size={8}
          onPress={() => {}}
          style={{ flexGrow: 1, justifyContent: "center", alignItem: "center" }}
        >
          <Ionicons name="search" size={18} color={"black"} />
        </Button>
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={filtereddata}
          renderItem={({ item, index }) => (
            <OverviewCard
              data={item}
              onPress={overviewCardPressHandler}
              index={index}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    marginHorizontal: 20,
    flexDirection: "row",
  },
  input: {
    flexGrow: 8,
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginLeft: 10,
    fontSize: 14,
    padding: 5,
  },
  flatListContainer: {
    paddingBottom: 80,
  },
});
export default OverviewScreen;
