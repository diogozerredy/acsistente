import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ListaCriancas from "../telas/listacrianca.js";
import Home from "../telas/Home.js";

const Tab = createBottomTabNavigator();
export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = "home";
          } else if (route.name === "ListaCriancas") {
            iconName = "users";
          }
          size = 30;
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#26A20A",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarActiveBackgroundColor: "white",
        tabBarLabelStyle: { fontSize: 17 },
        tabBarStyle: {
          height: 60,
          backgroundColor: "#26A20A",
          paddingHorizontal: 30,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen
        options={{ title: "Crianças" }}
        name="ListaCriancas"
        component={ListaCriancas}
      />
    </Tab.Navigator>
  );
}
