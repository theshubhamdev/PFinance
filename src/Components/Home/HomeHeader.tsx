import { StyleSheet, View } from "react-native";
import React from "react";
import CartIcon from "../../../Assets/Icons/Bag.svg";
import SearchIcon from "../../../Assets/Icons/Search.svg";
import { BaseInput, BaseText } from "..";

import { useForm } from "react-hook-form";
import { ThemeColors } from "../../Theme/theme.types";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../Contexts/CartContext";
import Feather from 'react-native-vector-icons/Feather';

interface ISearchForm {
  query: string;
}

const HomeHeader = () => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const { cart } = useCart();
  const styles = stylesFn(Colors);
  const { control } = useForm<ISearchForm>();

  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate("Cart");
  };
  return (
    <View
      style={[
        Layout.fullWidth,
        Layout.justifyContentAround,
        Gutters.largeVPadding,
        Gutters.smallHPadding,
        styles.root,
      ]}
    >
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
        ]}
      >
        <BaseText style={[Fonts.h1SemiBold, Fonts.textColorWhite]}>
          Hey, Rahul
        </BaseText>
        <View>
          <View style={[Layout.center, styles.cartTotal]}>
            <BaseText
              style={[
                Fonts.wtBold,
                Fonts.textMini,
                Fonts.textColorWhite,
                { top: -3 },
              ]}
            >
              {cart.length}
            </BaseText>
          </View>
          <CartIcon height={20} width={20} onPress={navigateToCart} />
        </View>
      </View>
      <View style={[Layout.alignItemsCenter, Gutters.largeVMargin]}>
        <BaseInput
          name="query"
          control={control}
          PrefixIconSvg={SearchIcon}
          containerStyles={[styles.searchContainer]}
          placeholder="Search Products or Store"
        />
      </View>
      <View style={[Layout.row, Layout.justifyContentBetween]}>
        <View>
          <BaseText style={[Fonts.textColorGrey]}>DELIVERY TO</BaseText>
          <BaseText style={[Fonts.textColorWhite]}>
            Green Way 3000, SylhetP
          </BaseText>
        </View>
        <View>
          <BaseText style={[Fonts.textColorGrey]}>WITHIN</BaseText>
          <BaseText style={[Fonts.textColorWhite]}>1 Hour <Feather name="chevron-down" /></BaseText>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      backgroundColor: Colors.primary,
      paddingTop: 50,
    },
    cartIcon: {
      width: 30,
      height: 30,
    },
    searchContainer: {
      borderRadius: 50,
      height: 60,
      width: "90%",
    },
    cartTotal: {
      position: "absolute",
      top: -5,
      right: -5,
      backgroundColor: Colors.bannerCardBg,
      width: 16,
      height: 16,
      borderRadius: 10,
      zIndex: 1,
    },
  });
