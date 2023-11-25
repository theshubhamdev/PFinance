import { View } from "react-native";
import React from "react";
import { BaseText } from "../Components";
import { useTheme } from "../hooks";

const Favourites = () => {
  const { Layout, Fonts } = useTheme();
  return (
    <View style={[Layout.fill, Layout.center]}>
      <BaseText style={[Fonts.textColorGrey, Fonts.textMidLarge]}>
        Favourites
      </BaseText>
    </View>
  );
};

export default Favourites;
