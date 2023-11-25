import React, { FC } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import useTheme from "../hooks/useTheme";

interface Props {
  type?: "primary" | "secondary";
  content: string;
  onPress: () => void;
}
const BaseButton: FC<Props> = ({ type = "primary", content, onPress }) => {
  const { Colors } = useTheme();
  const backgroundColor = type === "primary" ? Colors.btnPrimary : Colors.white;
  const textColor = type === "primary" ? Colors.btnPrimaryText : Colors.primary;

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: backgroundColor },
          type === "secondary" && { borderWidth: 1, borderColor: Colors.btnPrimary },
        ]}
        onPress={onPress}
      >
        <Text style={[styles.text, { color: textColor }]}>{content}</Text>
      </Pressable>
    </View>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 70
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
