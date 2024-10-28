import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ListaCriancas from "../telas/listacrianca.js";
import Home from "../telas/Home.js";

const Tab = createBottomTabNavigator();
export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="INICIO"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: "green", height: 60 },
        tabBarLabelStyle: {
          backgroundColor: "blue",
          fontSize: 13,
          marginBottom: 5,
        },
        // tabBarItemStyle: { backgroundColor: "red" },
        tabBarIconStyle: { backgroundColor: "yellow" },
        tabBarActiveBackgroundColor: "gray",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (color, size) => (
            <FontAwesome5
              style={{ textAlign: "center" }}
              name="home"
              size={30}
              color={"white"}
            />
          ),
        }}
        name="INICIO"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (color, size) => (
            <FontAwesome5
              style={{ textAlign: "center" }}
              name="users"
              size={30}
              color={"white"}
            />
          ),
        }}
        name="ListaCriancas"
        component={ListaCriancas}
      />
    </Tab.Navigator>
  );
}
