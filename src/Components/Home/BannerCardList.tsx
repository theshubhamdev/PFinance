import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BannerCard from "./BannerCard";
import HomeHeader from "./HomeHeader";

const BannerCardList = () => {
  return (
    <FlatList
      data={[0, 0, 0]}
      renderItem={BannerCard}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default BannerCardList;

const styles = StyleSheet.create({});
