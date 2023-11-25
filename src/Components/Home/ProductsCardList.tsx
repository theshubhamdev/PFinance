import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import BaseText from "../BaseText";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";
import { useTheme } from "../../hooks";
import BannerCardList from "./BannerCardList";
import useApi, { ApiResponse } from "../../hooks/useApi";

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface ProductDataResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const API_URL = 'https://dummyjson.com/products';

const ProductsCardList = () => {
  const { Layout, Gutters, Fonts } = useTheme();

  const { data, error, loading }: ApiResponse<ProductDataResponse> = useApi(API_URL);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <BaseText>Error Fetching the data</BaseText>;
  }
  
  return (
    <FlatList
      data={data?.products}
      renderItem={({item}) => <ProductCard data={item} />}
      numColumns={2}
      ListHeaderComponent={
        <>
          <BannerCardList />
          <BaseText style={[Gutters.regularHMargin, Fonts.h1SemiBold]}>
            Recommend
          </BaseText>
        </>
      }
      style={[Layout.flexGrow, Layout.fullWidth, Gutters.regularVMargin]}
      ListEmptyComponent={<BaseText>No Data Found</BaseText>}
    />
  );
};

export default ProductsCardList;

const styles = StyleSheet.create({});
