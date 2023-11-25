import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React, { FC } from "react";
import useTheme from "../hooks/useTheme";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const BaseText: FC<Props> = ({ children, style }) => {
  const { Colors, Fonts } = useTheme();
  return <Text style={[Fonts.fManrope, Fonts.textColorBlack, style]}>{children}</Text>;
};

export default BaseText;

const styles = StyleSheet.create({});
