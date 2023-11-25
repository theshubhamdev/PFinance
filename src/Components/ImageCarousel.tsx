import {
  View,
  Image,
  FlatList,
  useWindowDimensions,
  ViewabilityConfig,
  ViewToken,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { useTheme } from "../hooks";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ThemeColors } from "../Theme/theme.types";

interface IImageCarousel {
  images: string[];
  liked: boolean;
  id: number;
  updateFavourites: (id: number) => void;
}

const ImageCarousel = ({
  images,
  id,
  liked,
  updateFavourites,
}: IImageCarousel) => {
  const { Layout, Colors, Fonts, Gutters } = useTheme();
  const styles = stylesFn(Colors);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { width } = useWindowDimensions();

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    }
  );
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, aspectRatio: 3 / 2 }} />
        )}
        horizontal
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationIcon,
              {
                backgroundColor:
                  activeImageIndex === index
                    ? Colors.bannerCardBg
                    : Colors.white,
              },
            ]}
          />
        ))}
      </View>
      <AntDesign
        onPress={() => updateFavourites(id)}
        style={[Gutters.smallPadding, styles.likeBtn]}
        name={liked ? "heart" : "hearto"}
        size={15}
        color={liked ? Colors.iconHeartFilled : Colors.iconHeartOutline}
      />
    </View>
  );
};

export default ImageCarousel;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    likeBtn: {
      position: "absolute",
      top: 20,
      right: 20,
      backgroundColor: Colors.white,
      borderRadius: 10,
    },
    paginationIcon: {
      height: 5,
      margin: 10,
      marginHorizontal: 5,
      width: 20,
      borderRadius: 2,
    },
  });
