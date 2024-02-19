import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CardGroupContext } from "../store/CardGroup-Context";
import Button from "../components/UI/Button";
function CardsPage({ route, navigation }: { route: any; navigation: any }) {
  const id = route.params.id;
  const review = route.params.review;
  const learn = route.params.learn;
  const cardGroupCtx = useContext(CardGroupContext);
  const cardGroup = cardGroupCtx.cardGroups.find((item) => item.id === id);
  //console.log(cardGroup.name);
  function startHandler() {
    if (learn === 0 && review === 0) {
      navigation.navigate("CongratulationPage");
    } else {
      navigation.navigate("CardPage", { cardGroup: cardGroup });
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardGroup}>
        <Text>{id}</Text>
        <Text style={styles.title}>{cardGroup.name}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>学习：{learn}</Text>
          <Text style={styles.text}>复习：{review}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size={24}
            color="white"
            backgroundColor="blue"
            onPress={startHandler}
            style={styles.button}
          >
            开始
          </Button>
        </View>
      </View>
    </View>
  );
}
export default CardsPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardGroup: {
    //backgroundColor: Colors.primary,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    width: "90%",
    height: "70%",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",

    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  button: {
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
  },
});
