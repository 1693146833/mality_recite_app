import { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { CardGroupContext } from "../../store/CardGroup-Context";
import { checkInput2CreateCard, getCardById } from "../../components/util/util";
import AddInput from "../../components/UI/AddInput";
import Button from "../../components/UI/Button";

function EditPage({ navigation, route }: { navigation: any; route: any }) {
  const { id, groupId } = route.params;
  const cardGroupCtx = useContext(CardGroupContext);
  const card = getCardById(cardGroupCtx.cardGroups, id, groupId);
  const [input, setInput] = useState({
    front: card.front,
    back: card.back,
    hint: card.hint,
    tag: card.tag[0],
  });

  function inputHandler(type: string, text: string) {
    if (type === "front") {
      setInput({ ...input, front: text });
    } else if (type === "back") {
      setInput({ ...input, back: text });
    } else if (type === "hint") {
      setInput({ ...input, hint: text });
    } else if (type === "tag") {
      setInput({ ...input, tag: text });
    }
  }
  function editCardHandler() {
    if (!checkInput2CreateCard(input)) return;
    const newcard = Object.assign({ ...card }, input);
    delete newcard.groupName;
    cardGroupCtx.updateCard(groupId, newcard);
    navigation.goBack();
  }
  function deleteHandler() {
    cardGroupCtx.removeCard(groupId, id);

    navigation.goBack();
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <AddInput
          inputvalue={input.front}
          inputHandler={(text: any) => inputHandler("front", text)}
          style={{ minHeight: 100, textAlignVertical: "top" }}
        >
          牌面
        </AddInput>
        <AddInput
          inputvalue={input.back}
          inputHandler={(text: any) => inputHandler("back", text)}
          style={{ minHeight: 100, textAlignVertical: "top" }}
        >
          答案
        </AddInput>
        <AddInput
          inputvalue={input.hint}
          inputHandler={(text: any) => inputHandler("hint", text)}
        >
          提示
        </AddInput>
        <AddInput
          inputvalue={input.tag}
          inputHandler={(text: any) => inputHandler("tag", text)}
        >
          标签
        </AddInput>
      </View>
      <View>
        <Text style={{ textAlign: "center", fontSize: 14 }}>
          {card.groupName}
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button backgroundColor="lightblue" onPress={editCardHandler}>
          修改卡片
        </Button>
        <Button backgroundColor="lightblue" color="red" onPress={deleteHandler}>
          删除卡片
        </Button>
      </View>
    </ScrollView>
  );
}
export default EditPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 5,
  },
  buttons: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
  },
});
