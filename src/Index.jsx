import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeScr from "./screens/HomeScr";
import CompassScr from "./screens/CompassScr";
import Comp from "./screens/Comp";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScr}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Compass"
          component={CompassScr}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comp"
          component={Comp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}