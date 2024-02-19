import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Button from "../components/UI/Button";
import { CardGroupContext } from "../store/CardGroup-Context";
import { checkInput2CreateCard } from "../components/util/util";
import AddInput from "../components/UI/AddInput";
import { Ionicons } from "@expo/vector-icons";
function AddScreen() {
  const [input, setInput] = useState({
    front: "",
    back: "",
    hint: "",
    tag: "",
  });
  const [sendedIcon, setSendedIcon] = useState(false);
  const cardGroupCtx = useContext(CardGroupContext);
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
  function addCardHandler() {
    if (!checkInput2CreateCard(input)) return;
    cardGroupCtx.addCard(cardGroupCtx.headerData.value, input);
    resetHandler();
    setSendedIcon(true);
    setTimeout(() => {
      setSendedIcon(false);
    }, 2000);
  }
  function resetHandler() {
    setInput({ front: "", back: "", hint: "", tag: "" });
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text>添加卡片</Text> */}
        <AddInput
          inputvalue={input.front}
          inputHandler={(text: any) => inputHandler("front", text)}
          style={{ minHeight: 100, textAlignVertical: "top" }}
        >
          牌面
        </AddInput>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>牌面</Text>
          <TextInput
            value={input.front}
            onChangeText={(text) => inputHandler("front", text)}
            placeholder="Type here..."
            style={[
              styles.input,
              { minHeight: 100 },
              { textAlignVertical: "top" },
            ]}
            multiline={true}
          ></TextInput>
        </View> */}
        <AddInput
          inputvalue={input.back}
          inputHandler={(text: any) => inputHandler("back", text)}
          style={{ minHeight: 100, textAlignVertical: "top" }}
        >
          答案
        </AddInput>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>答案</Text>
          <TextInput
            value={input.back}
            onChangeText={(text) => inputHandler("back", text)}
            placeholder="Type here..."
            style={[
              styles.input,
              { minHeight: 100 },
              { textAlignVertical: "top" },
            ]}
            multiline={true}
          ></TextInput>
        </View> */}
        <AddInput
          inputvalue={input.hint}
          inputHandler={(text: any) => inputHandler("hint", text)}
        >
          提示
        </AddInput>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>提示</Text>
          <TextInput
            value={input.hint}
            onChangeText={(text) => inputHandler("hint", text)}
            placeholder="Type here..."
            style={styles.input}
            multiline={true}
          ></TextInput>
        </View> */}
        <AddInput
          inputvalue={input.tag}
          inputHandler={(text: any) => inputHandler("tag", text)}
        >
          标签
        </AddInput>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>标签</Text>
          <TextInput
            value={input.tag}
            onChangeText={(text) => inputHandler("tag", text)}
            placeholder="Type here..."
            style={styles.input}
            multiline={true}
          ></TextInput>
        </View> */}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {sendedIcon && (
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="checkmark-done" size={24} color="green" />

            <Text>已创建</Text>
          </View>
        )}
        <Text style={{ textAlign: "center", fontSize: 14 }}>
          {cardGroupCtx.headerData.label || "请选择添加的牌组"}
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button backgroundColor="lightblue" onPress={addCardHandler}>
          添加卡片
        </Button>
        <Button backgroundColor="lightblue" color="red" onPress={resetHandler}>
          重置
        </Button>
      </View>
    </ScrollView>
  );
}
export default AddScreen;
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
