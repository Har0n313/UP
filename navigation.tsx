import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StoreSelectionScreen from "./screens/StoreSelectionScreen";
import ProductsScreen from "./screens/ProductsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

export type RootStackParamList = {
  StoreSelection: undefined;
  Products: { store: string; storeId: number };
  Stores: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StoreSelection">
        <Stack.Screen name="StoreSelection" component={StoreSelectionScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
