import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CardGroupContext } from "../../store/CardGroup-Context";

function TopStats({
  studyTime,
  todayLearned,
}: {
  studyTime: number;
  todayLearned: number;
}) {
  const cardGroupCtx = useContext(CardGroupContext);
  function daytolearn() {
    if (cardGroupCtx.cardGroups.length === 0) {
      return ["无卡组"];
    }
    const cardgroups = cardGroupCtx.cardGroups.map((cardGroup: any) => {
      const list = cardGroup.cardList.map((card: any) => {
        if (card.timestamp <= new Date().getTime()) {
          return card.timestamp;
        }
      });
      if (list.length !== 0) {
        return cardGroup.name;
      }
    });
    if (cardgroups.length === 0) {
      return ["无学习任务"];
    }
    //console.log(cardgroups);
    return cardgroups;
  }
  return (
    <>
      <View style={styles.overview}>
        <Text style={styles.title}>今日</Text>
        <View style={{ borderTopWidth: 2, borderTopColor: "black" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.text}>已学习的卡片数量</Text>

            <Text style={styles.text}>{todayLearned || 0}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.text}>学习时长</Text>
            <Text style={styles.text}>
              {Math.floor(studyTime / 60) || 0}min
            </Text>

            <Text style={styles.text}>身价增长</Text>
            <Text style={styles.text}>
              {((studyTime * todayLearned) / 60).toFixed(2) || 0}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 2,
          borderTopColor: "black",
          marginVertical: 10,
        }}
      >
        <View>
          <Text style={styles.text}>最近该学习的卡组名</Text>
        </View>
        <View>
          {daytolearn().map((cardgroup: any, index) => {
            if (cardgroup !== undefined)
              return (
                <Text style={styles.text} key={index}>
                  {cardgroup}
                </Text>
              );
          })}
        </View>
      </View>
    </>
  );
}
export default TopStats;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    marginHorizontal: 10,
  },
  overview: {
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
  },
});
