import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "./Theme/Color";
import Navigation from "./Navigation";
import { CartProvider } from "./Contexts/CartContext";
import Toast from "react-native-toast-message";
import { FavouriteProvider } from "./Contexts/FavouritesContext";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <FavouriteProvider>
          <StatusBar
            backgroundColor={colors.black}
            barStyle={"light-content"}
          />
          <Navigation />
        </FavouriteProvider>
      </CartProvider>
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
