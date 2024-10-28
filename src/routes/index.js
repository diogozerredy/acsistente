import { NavigationContainer } from "@react-navigation/native";
import { CriancaProvider } from "./CriancaContext.js";
import StackRoutes from "./stack.routes.js";

export default function Routes() {
  return (
    <CriancaProvider>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </CriancaProvider>
  );
}
