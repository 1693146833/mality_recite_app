import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import HomeLongPressOptions from "./UI/HomeLongPressOptions";
import { SetStateAction, useLayoutEffect, useRef, useState } from "react";
function CardGroup({
  name,
  data,
  onPress,
  id,
  index,
  setModalVisible,
  setGroupId,
}: {
  name: string;
  data: {
    back: string;
    front: string;
    hint: string;
    tag: [string];
    progress: number;
    timestamp: number;
  }[];
  onPress: (id: number, learn: number, review: number) => void;
  id: number;
  index: number;
  setModalVisible: (
    arg0: SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
    }>
  ) => void;
  setGroupId: (id: number) => void;
}) {
  const [selected, setSelected] = useState(false);
  const learn = data.filter((item) => item.progress < 2).length;
  const review = data.length - learn;
  const { width, height } = Dimensions.get("screen");
  const onLongPress = (event: any) => {
    const { locationX, locationY, pageX, pageY } = event.nativeEvent;
    //console.log({ x: locationX + pageX, y: locationY + pageY }, "location");
    setModalVisible({
      visible: true,
      x: 0,
      y: pageY - 100,
    });
    setGroupId(id);
    setSelected((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPress(id, learn, review)}
        // style={({ pressed }) => pressed && styles.pressed}
        onLongPress={onLongPress}
      >
        <View style={selected && { backgroundColor: "lightgray" }}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>学习：{learn}</Text>
            <Text style={styles.text}>复习：{review}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default CardGroup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
