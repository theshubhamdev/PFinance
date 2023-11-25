import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../Types/navigation";
import { CartScreen, HomeScreen, ProductDetails } from "../Screens";
import { ThemeColors } from "../Theme/theme.types";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../hooks";
import Feather from "react-native-vector-icons/Feather";
import CartIcon from "../../Assets/Icons/BagDark.svg";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const { Layout, Colors, Gutters } = useTheme();
  const styles = stylesFn(Colors);
  return (
      <Stack.Navigator screenOptions={{
          headerShown: false,
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Product"
          component={ProductDetails}
          options={{
            headerShown: true,
            title: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable
                style={[Layout.center, Gutters.midLargeMargin, styles.circle]}
              >
                <Feather name="chevron-left" size={20} color={Colors.black} />
              </Pressable>
            ),
            headerRight: () => <CartIcon stroke={Colors.black}/>,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: true,
            title: "Shopping Cart",
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable
                style={[Layout.center, Gutters.midLargeMargin, Gutters.regularRMargin, styles.circle]}
              >
                <Feather name="chevron-left" size={20} color={Colors.black} />
              </Pressable>
            ),
            headerRight: () => <CartIcon />,
          }}
        />
      </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    circle: {
      width: 40,
      height: 40,
      backgroundColor: Colors.lightgrey,
      borderRadius: 20,
    },
  });
