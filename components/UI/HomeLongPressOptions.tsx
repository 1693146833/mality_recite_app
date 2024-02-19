import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  Platform,
} from "react-native";

function HomeLongPressOptions({
  onPressEdit,
  onPressDelete,
  modalVisible,
  setModalVisible,
}: {
  onPressEdit: () => void;
  onPressDelete: () => void;
  modalVisible: { visible: boolean; x: number; y: number };
  setModalVisible: (arg0: { visible: boolean; x: number; y: number }) => void;
}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setModalVisible({ visible: false, x: 0, y: 0 });
          onPressEdit();
        }}
      >
        <Text style={styles.optionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setModalVisible({ visible: false, x: 0, y: 0 });
          onPressDelete();
        }}
      >
        <Text style={styles.optionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
export default HomeLongPressOptions;
const styles = StyleSheet.create({
  option: {
    padding: 5,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
