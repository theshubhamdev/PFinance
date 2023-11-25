import { View } from "react-native";
import React from "react";
import { BaseText } from "../Components";
import { useTheme } from "../hooks";

const More = () => {
  const { Layout, Fonts } = useTheme();
  return (
    <View style={[Layout.fill, Layout.center]}>
      <BaseText style={[Fonts.textColorGrey, Fonts.textMidLarge]}>
        More
      </BaseText>
    </View>
  );
};

export default More;
