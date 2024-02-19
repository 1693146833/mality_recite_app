import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDaysForHeatmap } from "../components/util/util";

export async function getHeatMapdata() {
  const today = new Date().toISOString().split("T")[0];
  let heatMapCommitsData = await asyncStorageGet("commitsData");
  if (heatMapCommitsData[0]?.date) {
    const dataMonth = parseInt(heatMapCommitsData[0].date.split("-")[1]);
    const lag = dataMonth - parseInt(today.split("-")[1]);
    if (lag <= 2) {
      return heatMapCommitsData;
    }
  }
  const month = isQuarterStart(new Date(today));
  const date = `${today.split("-")[0]}-${month}-1`;
  //console.log(date);
  heatMapCommitsData = createDaysForHeatmap(date);

  return heatMapCommitsData;
}

export function getdefaultHeatMapdata() {
  const today = new Date().toISOString().split("T")[0];
  const month = isQuarterStart(new Date(today));
  const date = `${today.split("-")[0]}-${month}-1`;
  const heatMapCommitsData = createDaysForHeatmap(date);
  return heatMapCommitsData;
}
function isQuarterStart(date: Date) {
  const month = date.getMonth() + 1; // getMonth 返回的月份是从 0 开始的，所以需要加 1
  if (month <= 3) return 1;
  if (month <= 6) return 4;
  if (month <= 9) return 7;
  if (month <= 12) return 10;
  return 1;
}

export function changeHeatMapdata(
  studyTime: number,
  commitsData: any,
  todayLearned: number
) {
  const today = new Date().toISOString().split("T")[0];
  const todayIndex = commitsData.findIndex((item: any) => item.date === today);
  commitsData[todayIndex].count = changeCount(todayLearned, studyTime);
  return commitsData;
}
function changeCount(todayLearned: number, studyTime: number) {
  const studysecond = studyTime / 60;
  //console.log(studysecond, todayLearned);
  if (!todayLearned) {
    return 0;
  } else if (studysecond < 15) {
    return 1;
  } else if (studysecond < 60 && todayLearned < 100) {
    return 2;
  } else if (studysecond < 60 || todayLearned >= 100) {
    return 3;
  } else if (studysecond < 120 || todayLearned >= 100) {
    return 4;
  } else {
    return 5;
  }
}

export async function getBezierLineChartData() {
  let data = {
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(100,100,100, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["学习身价曲线图"], // optional
  };
  let heatMapCommitsData = await asyncStorageGet("bezierLineChartData");
  // console.log("getBezierLineChartData", heatMapCommitsData);
  if (!isEmpty(heatMapCommitsData) && heatMapCommitsData?.labels[0]) {
    data = heatMapCommitsData;
  }
  // console.log("ha");
  const today = new Date().toISOString().split("T")[0];
  for (let i = 1; i <= parseInt(today.split("-")[1]); i++) {
    if (data.labels[i]) continue;
    (data.labels as string[]).push(`${i}月`);
    (data.datasets[0].data as number[]).push(0);
  }
  //console.log("Data", data);
  return data;
}

function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export function getdefaultBezierLineChartData() {
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(100,100,100, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["学习身价曲线图"], // optional
  };

  const today = new Date().toISOString().split("T")[0];
  for (let i = 1; i <= parseInt(today.split("-")[1]); i++) {
    (data.labels as string[]).push(`${i}月`);
    (data.datasets[0].data as number[]).push(0);
  }
  return data;
}

export function changeBezierLineChart(
  studyTime: number,
  data: any,
  todayLearned: number
) {
  const today = new Date().toISOString().split("T")[0];
  const monthIndex = parseInt(today.split("-")[1]) - 1;

  data.datasets[0].data[monthIndex] = changeBezierLineChartCount(
    todayLearned,
    studyTime
  );
  return data;
}
function changeBezierLineChartCount(todayLearned: number, studyTime: number) {
  if (!todayLearned) return 0;
  const studysecond = studyTime / 60;
  return studysecond * todayLearned;
}

export async function asyncStorageSave(
  commitsData: any,
  bezierLineChartData: any
) {
  try {
    await AsyncStorage.setItem("commitsData", JSON.stringify(commitsData));
    await AsyncStorage.setItem(
      "bezierLineChartData",
      JSON.stringify(bezierLineChartData)
    );
    console.log("Statistic Data saved successfully.");
  } catch (error) {
    console.error("Error saving Statistic data:", error);
  }
}
async function asyncStorageGet(dataType: string) {
  let result: any = [];
  if (dataType === "commitsData") {
    result = [];
  } else if (dataType === "bezierLineChartData") {
    result = {};
  }

  try {
    const data = await AsyncStorage.getItem(dataType);
    if (data !== null) {
      const parsedData = JSON.parse(data);
      result = parsedData;
    }
  } catch (error) {
    console.error("Error fetching Statistic data:", error);
  }
  return result;
}
