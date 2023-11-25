import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { CartList } from "../Components/Cart";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import CartIcon from "../../Assets/Icons/Bag.svg";
import { useTheme } from "../hooks";
import { ThemeColors } from "../Theme/theme.types";

const Cart = () => {
  const { Layout, Gutters, Colors } = useTheme();
  const styles = stylesFn(Colors);
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CartIcon onPress={() => navigation.navigate("Cart")} />
      ),
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={[Layout.center, Gutters.midLargeVMargin,Gutters.regularRMargin, styles.circle]}
        >
          <Feather name="chevron-left" size={20} color={Colors.black} />
        </Pressable>
      ),
    });
  }, [navigation]);
  return <CartList />;
};

export default Cart;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    circle: {
      width: 40,
      height: 40,
      backgroundColor: Colors.lightgrey,
      borderRadius: 20,
    },
  });

