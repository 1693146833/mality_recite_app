import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CardGroupContext } from "../store/CardGroup-Context";
import DailyHeatmap from "../components/stats/DailyHeatmap";
import {
  asyncStorageSave,
  changeBezierLineChart,
  changeHeatMapdata,
  getBezierLineChartData,
  getHeatMapdata,
  getdefaultBezierLineChartData,
  getdefaultHeatMapdata,
} from "../data/changeStatisticdata";
import DailyStudyPersonalStudyAssetMap from "../components/stats/DailyStudyPersonalStudyAssetMap";
import TopStats from "../components/stats/TopStats";

function StatisticScreen() {
  const [statsData, setStatsData] = useState({
    //get default data
    commitsHeatMapData: getdefaultHeatMapdata(),
    bezierLineChartData: getdefaultBezierLineChartData(),
  });
  //获取数据=》过期？，不用
  const cardGroupCtx = useContext(CardGroupContext);
  const {
    studyTime = 0,
    todayLearned = 0,
    isLearn = false,
  } = cardGroupCtx.stats;
  // const bezierLineChartDatadefault = getBezierLineChartData();
  let commitsData = statsData.commitsHeatMapData;
  let bezierLineChartData = statsData.bezierLineChartData;
  if (isLearn) {
    commitsData = changeHeatMapdata(
      studyTime,
      statsData.commitsHeatMapData,
      todayLearned
    );
    bezierLineChartData = changeBezierLineChart(
      studyTime,
      statsData.bezierLineChartData,
      todayLearned
    );
    asyncStorageSave(commitsData, bezierLineChartData);
    cardGroupCtx.setStats({
      ...cardGroupCtx.stats,
      isLearn: false,
    });
  }
  useEffect(() => {
    async function setdata() {
      setStatsData({
        ...statsData,
        commitsHeatMapData: await getHeatMapdata(),
        bezierLineChartData: await getBezierLineChartData(),
      });
    }
    //console.log("commitsData");
    setdata();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TopStats studyTime={studyTime} todayLearned={todayLearned} />

        <View style={{ marginVertical: 10 }}>
          {/* <Text style={[styles.border, styles.title, { marginTop: 10 }]}>
          学习热力图
        </Text> */}
          <View style={{ marginLeft: -10, marginHorizontal: 10 }}>
            <DailyHeatmap commitsData={commitsData} />
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={{ marginLeft: -10, marginHorizontal: 10 }}>
            <DailyStudyPersonalStudyAssetMap data={bezierLineChartData} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default StatisticScreen;
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
  border: {
    borderBottomWidth: 1,
    borderColor: "black",
  },
});
