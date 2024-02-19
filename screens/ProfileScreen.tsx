import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Button from "../components/UI/Button";
function ProfileScreen({ navigation }: { navigation: any }) {
  function pressHandler() {
    navigation.navigate("FeedbackPage");
  }
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.text}>Created BY</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/1693146833")}
        >
          <Text style={styles.link}>https://github.com/1693146833</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={pressHandler}>反馈</Button>
    </View>
  );
}
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "blue",
  },
  text: {
    textAlign: "center",
  },
});
