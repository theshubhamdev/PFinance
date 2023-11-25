import { View } from "react-native";
import React from "react";
import { BaseText } from "../Components";
import { useTheme } from "../hooks";

const Categories = () => {
  const { Layout, Fonts } = useTheme();
  return (
    <View style={[Layout.fill, Layout.center]}>
      <BaseText style={[Fonts.textColorGrey, Fonts.textMidLarge]}>
        Categories
      </BaseText>
    </View>
  );
};

export default Categories;
