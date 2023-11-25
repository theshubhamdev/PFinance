import React, { FC } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  onPress?: () => void;
  name: string;
  textSize?: number;
  active?: boolean;
  bgColor?: string;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const BaseChip: FC<Props> = ({
  name,
  onPress,
  bgColor,
  textColor,
  textStyle,
  style,
  textSize = 14,
}) => {
  return (
    <Pressable
      style={[styles.chip, { backgroundColor: bgColor }, style]}
      onPress={onPress}
    >
      <View style={[styles.row, styles.center, { backgroundColor: bgColor }]}>
        <Text
          style={[
            styles.title,
            { color: textColor, fontSize: textSize },
            textStyle,
          ]}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    borderRadius: 36,
    minHeight: 20,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
  },
  icon: {
    marginRight: 5,
  },
});

export default BaseChip;
