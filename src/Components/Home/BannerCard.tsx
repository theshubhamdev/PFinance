import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../hooks";
import { ThemeColors } from "../../Theme/theme.types";
import BaseText from "../BaseText";

const BannerCard = () => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const styles = stylesFn(Colors);

  return (
    <View style={[Layout.row, Gutters.regularMargin, Gutters.largePadding, styles.root]}>
      <Image
        source={{ uri: "https://picsum.photos/200/300" }}
        resizeMode="contain"
        style={[styles.image]}
      />
      <View style={[Layout.justifyContentCenter]}>
        <BaseText style={[Fonts.textSmall, Fonts.textColorWhite]}>Get</BaseText>
        <BaseText style={[Fonts.h1Bold, Fonts.textColorWhite]}>
          50% OFF
        </BaseText>
        <BaseText style={[Fonts.textMicro, Fonts.textColorWhite]}>
          On first 03 order
        </BaseText>
      </View>
    </View>
  );
};

export default BannerCard;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      backgroundColor: Colors.bannerCardBg,
      borderRadius: 20,
    },
    image: {
      borderRadius: 5,
      height: 75,
      aspectRatio: 1,
      marginRight: 30,
    },
  });
