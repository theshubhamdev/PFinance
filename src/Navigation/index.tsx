import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabs from "../Components/BottomTabs";
import HomeStackNavigator from "./HomeStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { RootParamList } from "../Types/navigation";
import { CategoriesScreen, FavouritesScreen, MoreScreen } from "../Screens";

const Tab = createBottomTabNavigator<RootParamList>();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <BottomTabs {...props} />}
      >
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
