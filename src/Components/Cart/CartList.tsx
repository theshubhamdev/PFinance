import { FlatList, StyleSheet } from "react-native";
import React from "react";
import CartListItem from "./CartListItem";
import TotalCard from "./TotalCard";
import { useCart } from "../../Contexts/CartContext";

const CartList = () => {
  const {cart} = useCart();
  return (
    <FlatList
      data={cart}
      renderItem={({ item }) => <CartListItem {...item} />}
      ListFooterComponent={TotalCard}
    />
  );
};

export default CartList;

const styles = StyleSheet.create({});
