import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function OverviewCard({
  data,
  onPress,
  index,
}: {
  data: any;
  onPress: (id: string, groupId: string) => void;
  index: any;
}) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: index % 2 === 0 ? "transparent" : "lightgray" },
      ]}
    >
      <TouchableOpacity onPress={() => onPress(data.id, data.groupId)}>
        <Text style={styles.front}>{data.front}</Text>
        <View
          style={{
            flexDirection: "row",
            flexGrow: 1,
            borderTopWidth: 1,
            borderTopColor: "black",
          }}
        >
          <Text style={styles.groupName}>{data.group}</Text>
          <Text style={styles.date}>
            {new Date(data.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default OverviewCard;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  groupName: {
    fontSize: 12,
    fontWeight: "100",
    flex: 4,
    textAlign: "center",
  },
  date: {
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  front: {
    fontSize: 18,
  },
});
