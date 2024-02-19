import { Text, View, StyleSheet } from "react-native";

function LearningPage() {
  return (
    <View style={styles.container}>
      <Text>Learning Page</Text>
    </View>
  );
}
export default LearningPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
