import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerVacinas from "../telas/mostrarvacina.js";
import AdicionarVacina from "../telas/addvacina.js";
import Cadastro from "../telas/cadastro.js";
import TabRoutes from "./tab.routes.js";
import DetalhesCrianca from "../telas/detalhesCrianca.js";
import AdicionarPeso from "../telas/pesos.js";
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
        headerTitleStyle: { fontSize: 22, color: "#FFFFFF" },
      }}
    >
      <Stack.Screen
        options={{ title: "ACSISTENTE" }}
        name="Homestack"
        component={TabRoutes}
      />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen
        options={{ title: "Vacinas" }}
        name="VerVacina"
        component={VerVacinas}
      />
      <Stack.Screen name="Detalhes" component={DetalhesCrianca} />
      <Stack.Screen name="AdicionarDose" component={AdicionarVacina} />
      <Stack.Screen name="VerPesos" component={AdicionarPeso} />
    </Stack.Navigator>
  );
}
