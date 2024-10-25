import "react-native-gesture-handler";
import "react-native-reanimated";

import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import * as SplashScreen from "expo-splash-screen";
import Routes from "./src/routes";

export default function App() {
  const [loaded, error] = useFonts({ Lato_400Regular });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Routes />;
}
