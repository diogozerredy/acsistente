import DrawerRoutes from "./drawer.routes";
import { NavigationContainer } from "@react-navigation/native";
import { CriancaProvider } from "./CriancaContext.js";

export default function Routes() {
  return (
    <CriancaProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </CriancaProvider>
  );
}
