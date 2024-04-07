import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Tabs from "./Tabs";
import Cart from "./Cart";
import Login from "./Login";
import Register from "./Register";
import ProductDetails from "./ProductDetails";
import { useCallback } from "react";
import CategoryScreen from "./CategoryScreen";
import FavoritiesScreen from "./FavoritiesScreen";
import AddressScreen from './AddressScreen'
import ConfirmOrderScreen from "./ConfirmOrderScreen";
import OrdersScreen from "./OrdersScreen";
import View3d from "./View3d";

export default function ScreensNav() {
  const [fontsloaded]=useFonts({
    bold:require('../assets/fonts/Poppins-Bold.ttf'),
    extraBold:require('../assets/fonts/Poppins-ExtraBold.ttf'),
    light:require('../assets/fonts/Poppins-Light.ttf'),
    medium:require('../assets/fonts/Poppins-Medium.ttf'),
    regular:require('../assets/fonts/Poppins-Regular.ttf'),
    semiBold:require('../assets/fonts/Poppins-SemiBold.ttf'),

  })
    const onLayoutRootView=useCallback(async()=>{
    if (fontsloaded) {
      await SplashScreen.hideAsync();

    }
  },[fontsloaded])
  if (!fontsloaded) {
    return null;
  }
  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
        
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favorities"
            component={FavoritiesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="addAddress"
            component={AddressScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmOrderScreen"
            component={ConfirmOrderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrdersScreen"
            component={OrdersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="View3d"
            component={View3d}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
