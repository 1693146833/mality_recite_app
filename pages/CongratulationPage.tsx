import { Text, View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";

function CongratulationPage({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>恭喜完成本组卡牌</Text>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        返回
      </Button>
    </View>
  );
}
export default CongratulationPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    margin: 20,
  },
});
