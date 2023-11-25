import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { ThemeColors } from "../../Theme/theme.types";
import { useTheme } from "../../hooks";
import BaseText from "../BaseText";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Product } from "./ProductsCardList";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../Contexts/CartContext";
import Toast from "react-native-toast-message";
import { useFavourite } from "../../Contexts/FavouritesContext";

interface Props {
  data: Product;
}

const ProductCard: FC<Props> = ({ data: product }) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();

  const { addToCart } = useCart();
  const styles = stylesFn(Colors);
  const { favourites, updateFavourites } = useFavourite();
  const liked = favourites.find((favouriteItem) => favouriteItem === product.id)
    ? true
    : false;
  const navigation = useNavigation();

  const navigateToProduct = () => {
    navigation.navigate("Product", { id: product.id });
  };

  const addProductToCart = () => {
    addToCart({
      name: product.title,
      discount: product.discountPercentage,
      image: product.thumbnail,
      price: product.price,
      finalPrice: product.discountPercentage
        ? Number(
            (
              product.price -
              (product.discountPercentage / 100) * product.price
            ).toFixed(2)
          )
        : product.price,
      id: product.id,
      quantity: 1,
    });
    Toast.show({
      type: "success",
      text1: "Added To Cart",
      text2: `${product.title} was added to the cart`,
    });
  };

  return (
    <Pressable
      onPress={navigateToProduct}
      style={[styles.root, Gutters.regularMargin]}
    >
      <Image
        source={{ uri: product.thumbnail }}
        resizeMode="contain"
        style={[Layout.fullWidth, styles.image]}
      />
      <View
        style={[
          Layout.fill,
          Layout.justifyContentCenter,
          Gutters.regularHPadding,
        ]}
      >
        <BaseText style={[Fonts.wtBold]}>${product.price}</BaseText>
        <BaseText>{product.title}</BaseText>
      </View>
      <AntDesign
        onPress={() => updateFavourites(product.id)}
        style={[styles.likeBtn]}
        name={liked ? "heart" : "hearto"}
        size={20}
        color={liked ? Colors.iconHeartFilled : Colors.iconHeartOutline}
      />
      <Ionicons
        onPress={addProductToCart}
        style={[styles.addBtn]}
        name={"add-circle"}
        size={40}
        color={Colors.primaryDark}
      />
    </Pressable>
  );
};

export default ProductCard;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      backgroundColor: Colors.lightgrey,
      borderRadius: 20,
      height: 240,
      width: "40%",
    },
    image: {
      borderRadius: 5,
      marginRight: 30,
      flex: 3,
      overflow: "hidden",
    },
    likeBtn: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    addBtn: {
      position: "absolute",
      bottom: 30,
      right: 10,
    },
  });
