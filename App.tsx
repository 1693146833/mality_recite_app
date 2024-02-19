import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import {
  AppState,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import OverviewScreen from "./screens/OverviewScreen";
import { NavigationContainer } from "@react-navigation/native";
import AddScreen from "./screens/AddScreen";
import StatisticScreen from "./screens/StatisticScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardsPage from "./pages/CardsPage";
import CardGroupContextProvider, {
  CardGroupContext,
} from "./store/CardGroup-Context";
import CardPage from "./pages/CardPage";
import CongratulationPage from "./pages/CongratulationPage";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AllPage from "./pages/Overviews/AllPage";
import LearningPage from "./pages/Overviews/LearningPage";
import AddHeaderRight from "./components/AddHeaderRight";
import EditPage from "./pages/Overviews/EditPage";
import HomeHeaderRight from "./components/HomeHeaderRight";
import FeedbackPage from "./pages/FeedbackPage";
import { useContext, useEffect } from "react";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// const CustomDrawerContent = (props: any) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <Text style={{ marginVertical: 10 }}>Custom Text Here</Text>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// };
// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="AllPage" component={AllPage} />
//       <Drawer.Screen name="LearningPage" component={LearningPage} />
//     </Drawer.Navigator>
//   );
// }
function MyTap() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        // tabBarVisibilityAnimationConfig: {
        //   show: {
        //     animation: "timing",
        //     config: {
        //       duration: 100,
        //     },
        //   },
        //   hide: {
        //     animation: "timing",
        //     config: {
        //       duration: 100,
        //     },
        //   },
        // },
        // tabBarStyle: {
        //   opacity: 1, // Semi-transparent white background
        // },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerRight: () => <HomeHeaderRight />,
        }}
      />
      <Tab.Screen
        name="Statistic"
        component={StatisticScreen}
        options={{
          title: "Statistic",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons
              name="add-circle-outline"
              size={50}
              color={color}
              style={{ bottom: 20 }}
            />
          ),
          headerRight: () => <AddHeaderRight />,
        }}
      />
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={() => ({
          title: "Overview",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          //headerShown: false,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  const cardGroupCtx = useContext(CardGroupContext);
  useEffect(() => {
    // 添加 AppState 变化事件监听器
    const appStateChangeHandler = (nextAppState: any) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        // 当应用进入后台或即将进入后台时保存数据
        saveDataToStorage();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      appStateChangeHandler
    );

    // 在组件卸载时移除事件监听器
    return () => {
      subscription.remove();
    };
  }, []);

  const saveDataToStorage = async () => {
    try {
      // 在这里实现保存数据到 AsyncStorage 的逻辑
      await AsyncStorage.setItem(
        "cardGroups",
        JSON.stringify(cardGroupCtx.cardGroups)
      );
      console.log("Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <>
      <StatusBar style="auto" />
      <CardGroupContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyTap" component={MyTap} />
            <Stack.Screen name="CardsPage" component={CardsPage} />
            <Stack.Screen name="CardPage" component={CardPage} />
            <Stack.Screen
              name="CongratulationPage"
              component={CongratulationPage}
            />
            <Stack.Screen
              name="EditPage"
              component={EditPage}
              options={{ headerShown: true }}
            />
            <Stack.Screen name="FeedbackPage" component={FeedbackPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </CardGroupContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
