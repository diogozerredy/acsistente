import { createDrawerNavigator } from "@react-navigation/drawer";
import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";
const Drawer = createDrawerNavigator();
export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerItemStyle: { backgroundColor: "yellow" },
        headerTintColor: "white",
        headerLeftContainerStyle: { backgroundColor: "red" },
        headerStyle: {
          backgroundColor: "#26A20A",
          height: 150,
        },
        // headerTransparent: true,
        drawerLabel: "INICIO",
        headerTitleAlign: "center",
        title: "ACSISTENTE",
        headerTitleStyle: { fontSize: 35, color: "red" },
      }}
    >
      <Drawer.Screen name="Home" component={StackRoutes} />
    </Drawer.Navigator>
  );
}
