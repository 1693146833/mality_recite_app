import { View, Text } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getMonthLabel } from "../util/util";

// const commitsData = [
//   { date: "2017-01-02", count: 1 },
//   { date: "2017-01-03", count: 2 },
//   { date: "2017-01-04", count: 3 },
//   { date: "2017-01-05", count: 4 },
//   { date: "2017-01-06", count: 5 },
//   { date: "2017-01-30", count: 2 },
//   { date: "2017-01-31", count: 3 },
//   { date: "2017-01-07", count: 2 },
//   { date: "2017-01-08", count: 4 },
//   { date: "2017-01-09", count: 2 },
//   { date: "2017-01-10", count: 4 },
// ];
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "lightgray",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(50,50,50, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
function DailyHeatmap({
  commitsData,
}: {
  commitsData: { date: string; count: number }[];
}) {
  const handleToolTip: any = {};
  const screenWidth = Dimensions.get("window").width;
  const months = getMonthLabel(commitsData);
  //console.log(months,commitsData[commitsData.length-1].date);
  return (
    <>
      <View>
        <ContributionGraph
          values={commitsData}
          endDate={new Date(commitsData[commitsData.length - 1].date)}
          numDays={105}
          width={screenWidth}
          height={220}
          squareSize={18}
          chartConfig={chartConfig}
          tooltipDataAttrs={(value) => handleToolTip}
          //horizontal={false}
          getMonthLabel={(index) => months[index] + "月"}
        />
      </View>
    </>
  );
}

// const styles = StyleSheet.create({

// });

export default DailyHeatmap;
