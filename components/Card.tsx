import { Text, View, StyleSheet, ScrollView } from "react-native";
import Button from "../components/UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
function Card({
  card,
  onPress,
  backIsVisible,
  setBackIsVisible,
}: {
  card: any;
  onPress: () => void;
  backIsVisible: boolean;
  setBackIsVisible: (value: boolean) => void;
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInerContainer}>
        <View>
          <Text style={styles.title}>{card.front}</Text>
          {backIsVisible ? (
            <Text style={styles.anwser}>{card.back}</Text>
          ) : (
            <View>
              <Button
                size={12}
                color="white"
                backgroundColor="blue"
                onPress={() => {
                  setBackIsVisible(true);
                }}
              >
                显示答案
              </Button>
            </View>
          )}
        </View>
      </View>
      <View style={styles.editIcon}>
        <Button
          size={6}
          color="white"
          backgroundColor="transparent"
          onPress={onPress}
        >
          <Ionicons name="pencil" size={20} color="black"></Ionicons>
        </Button>
      </View>
    </View>
  );
}
export default Card;
const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    minHeight: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  cardInerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  anwser: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  editIcon: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
});
