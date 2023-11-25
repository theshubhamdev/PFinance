import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import ImageCarousel from "../Components/ImageCarousel";
import { BaseButton, BaseChip, BaseText } from "../Components";
import { useTheme } from "../hooks";
import { Rating } from "react-native-ratings";
import { Gutters, Layout } from "../Theme";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Product } from "../Components/Home/ProductsCardList";
import useApi, { ApiResponse } from "../hooks/useApi";
import CartIcon from "../../Assets/Icons/BagDark.svg";
import Feather from "react-native-vector-icons/Feather";
import { ThemeColors } from "../Theme/theme.types";
import { useCart } from "../Contexts/CartContext";
import Toast from "react-native-toast-message";
import { useFavourite } from "../Contexts/FavouritesContext";

const API_URL = "https://dummyjson.com/products";

const ProductDetails = () => {
  const { Fonts, Colors } = useTheme();
  const styles = stylesFn(Colors);
  const route = useRoute();
  const isFocused = useIsFocused();
  const { cart, addToCart } = useCart();
  const navigation = useNavigation();
  const { favourites, updateFavourites } = useFavourite();
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {isFocused ? (
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
          ) : (
            <></>
          )}
          <CartIcon onPress={() => navigation.navigate("Cart")} />
        </>
      ),
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={[Layout.center, Gutters.midLargeVMargin, styles.circle]}
        >
          <Feather name="chevron-left" size={20} color={Colors.black} />
        </Pressable>
      ),
    });
  }, [navigation]);

  if (!route.params?.id) {
    return <BaseText>Product Not Found</BaseText>;
  }
  const { data, error, loading }: ApiResponse<Product> = useApi(
    API_URL + "/" + route?.params?.id
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    return <BaseText>Error Fetching the data</BaseText>;
  }

  const liked = favourites.find((favouriteItem) => favouriteItem === data.id)
    ? true
    : false;
  const addProductToCart = () => {
    addToCart({
      name: data.title,
      discount: data.discountPercentage,
      image: data.thumbnail,
      price: data.price,
      finalPrice: data.discountPercentage
        ? Number(
            (data.price - (data.discountPercentage / 100) * data.price).toFixed(
              2
            )
          )
        : data.price,
      id: data.id,
      quantity: 1,
    });
    Toast.show({
      type: "success",
      text1: "Added To Cart",
      text2: `${data.title} was added to the cart`,
    });
  };
  return (
    <View style={[{ backgroundColor: Colors.background }, Layout.fill]}>
      <View style={[Gutters.smallHPadding]}>
        <BaseText style={[Fonts.textLarge]}>{data?.brand}</BaseText>
        <BaseText style={[Fonts.textLarge, Fonts.wtBold]}>
          {data?.title}
        </BaseText>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Rating
            ratingColor={Colors.bannerCardBg}
            ratingCount={5}
            imageSize={15}
            style={{
              paddingVertical: 10,
              backgroundColor: Colors.background,
            }}
            readonly
            startingValue={data?.rating}
          />
          <BaseText style={[Gutters.smallPadding, Fonts.textColorGrey]}>
            110 Reviews
          </BaseText>
        </View>
      </View>
      <ImageCarousel
        images={data?.images || []}
        liked={liked || false}
        id={data.id}
        updateFavourites={updateFavourites}
      />
      <View
        style={[Layout.row, Layout.alignItemsCenter, Gutters.regularMargin]}
      >
        <BaseText style={[Fonts.textColorPrimary, Fonts.wt700]}>
          $
          {data?.discountPercentage
            ? (
                data.price -
                (data.discountPercentage / 100) * data?.price
              ).toFixed(2)
            : data?.price}
        </BaseText>
        {data?.discountPercentage && (
          <BaseChip
            name={
              "$" +
              ((data.discountPercentage / 100) * data?.price).toFixed(2) +
              " OFF"
            }
            bgColor={Colors.primary}
            textColor={Colors.white}
            textSize={12}
          />
        )}
      </View>
      <View style={[Layout.row]}>
        <BaseButton
          content="Add To Cart"
          type="secondary"
          onPress={addProductToCart}
        />
        <BaseButton
          content="Buy Now"
          onPress={() => {
            addProductToCart();
            navigation.navigate("Cart");
          }}
        />
      </View>
      <View style={[Gutters.regularPadding]}>
        <BaseText style={[Gutters.tinyBMargin]}>Details</BaseText>
        <BaseText style={[Fonts.textColorGrey, { lineHeight: 25 }]}>
          {data?.description}
        </BaseText>
      </View>
    </View>
  );
};

export default ProductDetails;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    circle: {
      width: 40,
      height: 40,
      backgroundColor: Colors.lightgrey,
      borderRadius: 20,
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
