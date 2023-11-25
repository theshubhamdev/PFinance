import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TotalCardItem from "./TotalCardItem";
import { ThemeColors } from "../../Theme/theme.types";
import { useTheme } from "../../hooks";
import { Gutters } from "../../Theme";
import BaseButton from "../BaseButton";
import { useCart } from "../../Contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import BaseText from "../BaseText";

const TotalCard = () => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const { cart, clearCart } = useCart();
  const navigation = useNavigation();
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity * item.finalPrice;
  });

  const placeOrder = () => {
    clearCart();
    navigation.goBack();
    Toast.show({
      type: "success",
      text1: "Order Placed",
      text2: `Order was successfully placed`,
    });
  };
  const styles = stylesFn(Colors);
  return total > 0 ? (
    <View style={[styles.root, Gutters.regularMargin, Gutters.extraLargeBMargin, Gutters.extraLargeBPadding]}>
      <TotalCardItem
        priceTitle="Subtotal"
        priceTotal={`$${total.toFixed(2)}`}
      />
      <TotalCardItem
        priceTitle="Delivery"
        priceTotal={total > 0 ? "$2.00" : "$0.00"}
      />
      <TotalCardItem
        priceTitle="Total"
        priceTotal={`$${(Number(total.toFixed(2)) + 2).toFixed(2)}`}
      />
      <BaseButton content="Proceed To Checkout" onPress={placeOrder} />
    </View>
  ) : (
    <View style={[Layout.fill, Layout.center, Gutters.extraLargeTMargin]}>
      <BaseText style={[Fonts.h1Bold]}>Your cart is empty</BaseText>
    </View>
  );
};

export default TotalCard;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      backgroundColor: Colors.lightgrey,
      borderRadius: 10,
    },
  });
