import { Text, View, StyleSheet } from "react-native";

function AllPage() {
  return (
    <View style={styles.container}>
      <Text> AllPage</Text>
    </View>
  );
}
export default AllPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
