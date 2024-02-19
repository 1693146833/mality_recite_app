import { View, StyleSheet, ScrollView } from "react-native";
import Button from "../components/UI/Button";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import { useContext, useEffect, useRef, useState } from "react";
import { CardGroupContext } from "../store/CardGroup-Context";
import { getCardList } from "../components/util/util";
function CardPage({ navigation, route }: { navigation: any; route: any }) {
  const [backIsVisible, setBackIsVisible] = useState(false);
  const groupid = route.params.cardGroup.id;
  const cardGroupCtx = useContext(CardGroupContext);
  const cardList = getCardList(cardGroupCtx.cardGroups, groupid);
  const [currentIndex, setCurrentIndex] = useState(0);
  const todayLearned = useRef(0);
  //let todayLearned = 0;
  function PressHandler(known: string) {
    todayLearned.current += 1;
    if (currentIndex < cardList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      navigation.navigate("CongratulationPage");
    }
    setBackIsVisible(false);
    let progress = cardList[currentIndex].progress;
    if (known === "remember") {
      if (progress == 2) return;
      progress = progress + 1;
    } else if ((known = "forget")) {
      if (progress == 0) return;
      progress = progress - 1;
    }
    cardGroupCtx.updateCardProgress(
      groupid,
      cardList[currentIndex].id,
      progress
    );
  }

  useEffect(() => {
    let time = 0;
    const interval = setInterval(() => {
      time++;
      //setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => {
      cardGroupCtx.setStats({
        studyTime: time,
        todayLearned: todayLearned.current,
        isLearn: true,
      });
      clearInterval(interval);
    };
  }, []);
  function pressPencilHandler() {
    navigation.navigate("EditPage", {
      id: cardList[currentIndex].id,
      groupId: route.params.cardGroup.id,
    });
  }
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <Button
            size={12}
            color="white"
            backgroundColor="transparent"
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="close" size={24} color="black" />
          </Button>
        </View>
        <Card
          card={cardList[currentIndex]}
          onPress={pressPencilHandler}
          backIsVisible={backIsVisible}
          setBackIsVisible={setBackIsVisible}
        />
        <View style={styles.buttons}>
          <Button
            size={20}
            color="white"
            backgroundColor="blue"
            onPress={() => PressHandler("forget")}
            style={styles.button}
          >
            不认识
          </Button>
          <Button
            size={20}
            color="white"
            backgroundColor="blue"
            onPress={() => PressHandler("remember")}
            style={styles.button}
          >
            认识
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
export default CardPage;
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    //justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  closeButtonContainer: {
    // backgroundColor: "gray",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 30,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 30,
  },
});
