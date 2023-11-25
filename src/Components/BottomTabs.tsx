import React, { FC, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import BottomTabsItem from "./BottomTabsItem";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get("screen");

const BottomTabs: FC<BottomTabBarProps> = ({ state, navigation }) => {
  const [selected, setSelected] = useState("HomeStack");
  const { routes } = state;

  const handlePress = (activeTab: string, index: number) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container]}>
        {routes.map((route, index) => (
          <BottomTabsItem
            tab={route}
            onPress={() => handlePress(route.name, index)}
            selected={selected}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopEndRadius: 20,
    backgroundColor: "transparent",
  },
});

export default BottomTabs;
