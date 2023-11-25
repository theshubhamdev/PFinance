import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useTheme } from "../../hooks";
import { ThemeColors } from "../../Theme/theme.types";
import BaseText from "../BaseText";
import { useCart } from "../../Contexts/CartContext";

export interface ICartProduct {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
  finalPrice: number;
}

const CartListItem: FC<ICartProduct> = ({
  id,
  name,
  price,
  discount,
  image,
  quantity,
  finalPrice,
}) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const styles = stylesFn(Colors);

  const { removeFromCart, addToCart } = useCart();

  const removeProductFromCart = () => {
    removeFromCart(id);
  };
  const addProductToCart = () => {
    addToCart({
      name,
      discount,
      image,
      price,
      finalPrice,
      id: id,
      quantity: 1,
    });
  };
  return (
    <View
      style={[
        Layout.row,
        Layout.justifyContentBetween,
        Gutters.regularMargin,
        Gutters.regularBPadding,
        styles.root,
      ]}
    >
      <View style={[Layout.row, Layout.justifyContentStart]}>
        <Image source={{ uri: image }} style={[styles.image]} />
        <View style={[]}>
          <BaseText>{name}</BaseText>
          <BaseText>${finalPrice}</BaseText>
        </View>
      </View>
      <View style={[Layout.row, Layout.center]}>
        <Pressable
          onPress={removeProductFromCart}
          style={[Layout.center, styles.circle]}
        >
          <BaseText style={[Fonts.h1Bold, { marginBottom: 5 }]}>-</BaseText>
        </Pressable>
        <BaseText style={[Gutters.regularHMargin]}>{quantity}</BaseText>
        <Pressable
          onPress={addProductToCart}
          style={[Layout.center, styles.circle]}
        >
          <BaseText style={[Fonts.h1SemiBold, { marginBottom: 5 }]}>+</BaseText>
        </Pressable>
      </View>
    </View>
  );
};

export default CartListItem;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      borderBottomWidth: 0.2,
      borderBottomColor: Colors.grey,
    },
    image: {
      borderRadius: 5,
      height: 60,
      aspectRatio: 1,
      marginRight: 10,
    },
    circle: {
      width: 40,
      height: 40,
      backgroundColor: Colors.lightgrey,
      borderRadius: 20,
    },
  });
