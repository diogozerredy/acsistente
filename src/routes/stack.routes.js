import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerVacinas from "../telas/mostrarvacina.js";
import AdicionarVacina from "../telas/addvacina.js";
import Cadastro from "../telas/cadastro.js";
import TabRoutes from "./tab.routes.js";
const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homestack" component={TabRoutes} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="MostrarVacina" component={VerVacinas} />

      <Stack.Screen name="AdicionarVacina" component={AdicionarVacina} />
    </Stack.Navigator>
  );
}
