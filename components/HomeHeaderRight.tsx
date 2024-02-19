import { View, Text, Modal, StyleSheet } from "react-native";
import Select from "./UI/Select";
import Button from "./UI/Button";
import AddInput from "./UI/AddInput";
import { useContext, useState } from "react";
import { CardGroupContext } from "../store/CardGroup-Context";

function HomeHeaderRight() {
  const cardGroupCtx = useContext(CardGroupContext);
  const [isModalVisibal, setIsModalVisibal] = useState(false);
  const [input, setInput] = useState("");
  function pressHandler() {
    setInput("");
    setIsModalVisibal((prv) => !prv);
  }
  function createGroupHandler() {
    cardGroupCtx.addCardGroup({ name: input });
    pressHandler();
  }
  function cancelCreateGroupHandler() {
    pressHandler();
  }
  return (
    <View
      style={{
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Button
        backgroundColor="transparent"
        color="black"
        onPress={pressHandler}
      >
        添加牌组
      </Button>
      <Modal
        visible={isModalVisibal}
        transparent={true}
        animationType={"slide"}
        onRequestClose={cancelCreateGroupHandler}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          <View
            style={{
              backgroundColor: "rgba(0.2, 0.2, 0.2, 0.5)",
              marginHorizontal: 10,
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <AddInput
              inputvalue={input}
              inputHandler={setInput}
              labelStyle={{ color: "white" }}
              style={{ minHeight: 50, textAlignVertical: "top" }}
            >
              输入添加的牌组名
            </AddInput>
            <View style={styles.buttons}>
              <Button onPress={createGroupHandler}>创建</Button>
              <Button onPress={cancelCreateGroupHandler}>取消</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default HomeHeaderRight;
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
