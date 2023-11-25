import React, { FC, useMemo } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootParamList } from "../Types/navigation";
import { useTheme } from "../hooks";
import { ThemeColors } from "../Theme/theme.types";
import IconContainer from "../../Assets/Icons/IconContainer.svg";
import HomeIcon from "../../Assets/Icons/Home.svg";
import CategoriesIcon from "../../Assets/Icons/Categories.svg";
import HeartIcon from "../../Assets/Icons/Heart.svg";
import ThreeDotsIcon from "../../Assets/Icons/ThreeDots.svg";

interface Props {
  tab: RouteProp<RootParamList>;
  onPress: () => void;
  selected: string;
}

const BottomTabsItem: FC<Props> = ({ tab, onPress, selected }) => {
  const { Colors, Layout, Fonts } = useTheme();
  const styles = stylesFn(Colors);

  const Icon = useMemo(() => {
    switch (tab.name) {
      case "HomeStack":
        return HomeIcon;
      case "Categories":
        return CategoriesIcon;
      case "Favourites":
        return HeartIcon;
      case "More":
        return ThreeDotsIcon;
      default:
        break;
    }
  }, []);
  if (tab.name == selected) {
    return (
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.fill,
          styles.ucontainer,
        ]}
      >
        <View style={[]}>
          <View style={[Layout.center, styles.activeContainer]}>
            <View style={[Layout.center, styles.circle]}>
              {Icon ? (
                <Icon
                  color={Colors.tabIconActive}
                  fill={Colors.tabIconActive}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <IconContainer
          style={{ position: "absolute", bottom: -50, left: -74 }}
          fill={Colors.white}
          color={Colors.white}
        />
      </View>
    );
  } else {
    return (
      <Pressable
        style={[
          Layout.center,
          Layout.fill,
          styles.baseContainer,
          styles.container,
        ]}
        onPress={onPress}
        pressRetentionOffset={2}
      >
        <View style={[Layout.center]}>
          {Icon ? <Icon color={Colors.white} fill={Colors.white} /> : <></>}
        </View>
        <Text style={[Fonts.textColorGrey, Fonts.textMicro]}>
          {tab.name === "HomeStack" ? "Home" : tab.name}
        </Text>
      </Pressable>
    );
  }
};

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    ucontainer: {
      maxHeight: 90,
    },
    baseContainer: {
      padding: 13,
      height: 82,
    },
    container: {
      backgroundColor: Colors.tabBarColor,
      zIndex: 2,
    },
    bottomLine: {
      width: "100%",
      height: 30,
      backgroundColor: Colors.tabBarColor,
      position: "absolute",
      bottom: 0,
    },
    activeContainer: {
      height: 70,
      width: 70,
      borderRadius: 35,
      backgroundColor: Colors.transparent,
      top: -30,
      justifyContent: "center",
    },

    circle: {
      width: 50,
      height: 50,
      backgroundColor: Colors.black,
      borderRadius: 25,
    },
  });

export default BottomTabsItem;
