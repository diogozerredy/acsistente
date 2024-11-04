import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerVacinas from "../telas/mostrarvacina.js";
import Cadastro from "../telas/cadastro.js";
import TabRoutes from "./tab.routes.js";
import DetalhesCrianca from "../telas/detalhesCrianca.js";
import AdicionarPeso from "../telas/pesos.js";
import Sobre from "../telas/Sobre.js";
import AdicionarNovaVacina from "../telas/AdicionarNovaDose.js";
import AdicionarDose from "../telas/addDose.js";
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
      <Stack.Screen name="AdicionarDose" component={AdicionarDose} />
      <Stack.Screen name="OutrasVacinas" component={AdicionarNovaVacina} />
      <Stack.Screen
        options={{ title: "Pesos" }}
        name="VerPesos"
        component={AdicionarPeso}
      />
      <Stack.Screen name="Sobre" component={Sobre} />
    </Stack.Navigator>
  );
}
