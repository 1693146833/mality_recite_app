import { Modal, View, StyleSheet, Text } from "react-native";
import AddInput from "../UI/AddInput";
import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import { CardGroupContext } from "../../store/CardGroup-Context";

function HomeEditAndDeleteModal({
  groupId,
  ediDelModalVisible,
  setEdiDelModalVisible,
}: {
  groupId: number;
  ediDelModalVisible: {
    visibal: boolean;
    type: string;
    cardGroup: {
      name: string;
    };
  };
  setEdiDelModalVisible: (arg0: {
    visibal: boolean;
    type: string;
    cardGroup: { name: string };
  }) => void;
}) {
  const [input, setInput] = useState("");
  const cardGroupCtx = useContext(CardGroupContext);
  function closeModalHandler() {
    setEdiDelModalVisible({
      visibal: false,
      type: "",
      cardGroup: { name: "" },
    });
  }
  function pressHandler() {
    if (ediDelModalVisible.type === "edit") {
      const newCardgroup = { ...ediDelModalVisible.cardGroup, name: input };
      cardGroupCtx.updateCardGroup(newCardgroup);
    } else {
      cardGroupCtx.removeCardGroup(groupId.toString());
    }
    closeModalHandler();
  }
  useEffect(() => {
    setInput(ediDelModalVisible.cardGroup.name);
  }, [ediDelModalVisible]);
  function whetherVisibel() {
    if (ediDelModalVisible.visibal && ediDelModalVisible.type) return true;
    return false;
  }
  return (
    <Modal
      visible={ediDelModalVisible.visibal}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModalHandler}
    >
      <View style={styles.container}>
        {ediDelModalVisible.type === "edit" ? (
          <View style={{ marginHorizontal: 5 }}>
            <AddInput
              inputHandler={setInput}
              inputvalue={input}
              labelStyle={{ color: "white" }}
            >
              {groupId},{ediDelModalVisible.type}
              {ediDelModalVisible.cardGroup?.name}
            </AddInput>
          </View>
        ) : (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.text}>
              {ediDelModalVisible.cardGroup.name}
              {ediDelModalVisible.type}
            </Text>
          </View>
        )}
        <View style={styles.buttons}>
          <Button onPress={pressHandler}>
            {ediDelModalVisible.type === "edit" ? "修改" : "删除"}
          </Button>
          <Button onPress={closeModalHandler}>取消</Button>
        </View>
      </View>
    </Modal>
  );
}
export default HomeEditAndDeleteModal;
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
