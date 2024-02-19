import { LineChart } from "react-native-chart-kit";
import { View } from "react-native";
import { Dimensions } from "react-native";
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
// const data = {
//   labels: [
//     "1月",
//     "2月",
//     "3月",
//     "4月",
//     "5月",
//     "6月",
//     "7月",
//     "8月",
//     "9月",
//     "10月",
//     "11月",
//     "12月",
//   ],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43, 50, 20, 45, 28, 80, 99, 43],
//       color: (opacity = 1) => `rgba(100,100,100, ${opacity})`, // optional
//       strokeWidth: 2, // optional
//     },
//   ],
//   legend: ["学习身价曲线图"], // optional
// };
function DailyStudyPersonalStudyAssetMap({ data }: { data: any }) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        fromZero={true}
        withDots={false}
      />
    </View>
  );
}
export default DailyStudyPersonalStudyAssetMap;
