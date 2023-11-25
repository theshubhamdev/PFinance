import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useTheme } from "../../hooks";
import BaseText from "../BaseText";

interface ITotalCardItem {
  priceTitle: string;
  priceTotal: string;
}

const TotalCardItem: FC<ITotalCardItem> = ({ priceTitle, priceTotal }) => {
  const { Layout, Gutters } = useTheme();
  return (
    <View
      style={[Layout.row, Layout.justifyContentBetween, Gutters.regularPadding]}
    >
      <BaseText>{priceTitle}</BaseText>
      <BaseText>{priceTotal}</BaseText>
    </View>
  );
};

export default TotalCardItem;

const styles = StyleSheet.create({});
