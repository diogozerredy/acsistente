import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerVacinas from "../telas/mostrarvacina.js";
import AdicionarVacina from "../telas/addvacina.js";
import Cadastro from "../telas/cadastro.js";
import TabRoutes from "./tab.routes.js";
import TelaCrianca from "../telas/telaCrianca.js";
const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Homestack"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#26A20A",
        },
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 20, color: "red" },
      }}
    >
      <Stack.Screen
        options={{ title: "ACISISTENTE" }}
        name="Homestack"
        component={TabRoutes}
      />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="VerVacina" component={VerVacinas} />
      <Stack.Screen name="TelaCrianca" component={TelaCrianca} />
      <Stack.Screen name="AdicionarVacina" component={AdicionarVacina} />
    </Stack.Navigator>
  );
}
