import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeColors } from "../Theme/theme.types";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import { RootParamList } from "../Types/navigation";
import HomeIcon from "../../Assets/Icons/Home.svg";
import CategoriesIcon from "../../Assets/Icons/Categories.svg";
import HeartIcon from "../../Assets/Icons/Heart.svg";
import ThreeDotsIcon from "../../Assets/Icons/ThreeDots.svg";
import { BaseText } from "../Components";

const Tab = createBottomTabNavigator<RootParamList>();

const Navigation = () => {
  const { Colors, Fonts, Layout } = useTheme();
  const [activeTab, setActiveTab] = useState("HomeStack");
  const styles = stylesFn(Colors);
  console.log(activeTab);

  return (
    <NavigationContainer>
      <Tab.Navigator
        // tabBar={}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.tabIconActive,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: {backgroundColor: Colors.transparent},
          tabBarButton: ({ children, ...rest }) => {
            return (
              <Pressable
                {...rest}
                onPress={() => setActiveTab(route.name)}
                style={[Layout.center, styles.normalTab, activeTab === route.name && styles.activeTab]}
              >
                {activeTab === route.name ? (
                  <View style={[Layout.center, styles.activeOuterView]}>{children}</View>
                ) : (
                  children
                )}
              </Pressable>
            );
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                // <View style={[Layout.center, styles.activeOuterView]}>
                //   <View style={[Layout.center, styles.activeIconView]}>
                    <HomeIcon color={color} fill={focused ? color : "none"} />
                //   </View>
                // </View>
              ) : (
                <>
                  <HomeIcon color={color} fill={focused ? color : "none"} />
                  <BaseText>Home</BaseText>
                </>
              ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <CategoriesIcon fill={focused ? color : "none"} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <HeartIcon fill={focused ? color : "none"} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <ThreeDotsIcon fill={focused ? color : "none"} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    activeOuterView: {
      height: 60,
      width: 60,
      borderRadius: 30,
      position: 'absolute',
      backgroundColor: Colors.primary,
      top: -10,
    },
    activeTab: {
      flex: 1,
      zIndex: -1
    },
    normalTab: {
      backgroundColor: Colors.white,
      flex: 1,
    },
    activeIconView: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    circle: {
      width: 40,
      height: 40,
      backgroundColor: Colors.lightgrey,
      borderRadius: 20,
    },
    tabBar: {
      height: 70,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      backgroundColor: Colors.white,
    },
  });
