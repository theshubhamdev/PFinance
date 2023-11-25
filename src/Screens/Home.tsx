import { FlatList } from "react-native";
import React from "react";
import { HomeHeader } from "../Components/Home";
import ProductsCardList from "../Components/Home/ProductsCardList";

const HomeScreen = () => {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={<HomeHeader />}
      ListFooterComponent={<ProductsCardList />}
    />
  );
};

export default HomeScreen;