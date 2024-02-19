import { Text, View, StyleSheet } from "react-native";
import AddInput from "../components/UI/AddInput";
import { useState } from "react";
import Button from "../components/UI/Button";
import { Ionicons } from "@expo/vector-icons";
function FeedbackPage({ navigation }: { navigation: any }) {
  const [input, setInput] = useState("");
  const [success, setSuccess] = useState("");
  const sendHandler = async () => {
    try {
      const res = await fetch("http://192.168.43.124:3000/recieve-feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      if (res.status === 200) setSuccess("success");
      setInput("");
    } catch (error) {
      console.error("Failed to send feeds:", error);
      setSuccess("failed");
    }
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };
  const goback = () => {
    navigation.goBack();
  };
  function checkView() {
    if (success === "success") {
      return (
        <View style={styles.mark}>
          <Ionicons name="checkmark" size={24} color={"green"} />
          <Text style={{ color: "green" }}>发送成功</Text>
        </View>
      );
    } else if (success === "failed") {
      return (
        <View style={styles.mark}>
          <Ionicons name="close" size={24} color={"red"} />
          <Text style={{ color: "red" }}>发送失败</Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.container}>
      <AddInput
        inputvalue={input}
        inputHandler={setInput}
        labelStyle={{ color: "black" }}
        style={styles.inputStyle}
      >
        反馈
      </AddInput>
      <View style={styles.buttons}>
        <Button onPress={sendHandler}>发送</Button>
        <Button onPress={goback}>返回</Button>
      </View>
      {checkView()}
    </View>
  );
}
export default FeedbackPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputStyle: {
    height: 100,
    textAlignVertical: "top",
  },
  mark: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
