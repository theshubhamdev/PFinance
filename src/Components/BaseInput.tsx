import React, { FC, useMemo } from "react";
import { View, Text, TextInput, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import useTheme from "../hooks/useTheme";
import { ThemeColors } from "../Theme/theme.types";
import { SvgProps } from "react-native-svg";
import BaseText from "./BaseText";

interface IBaseInput<ContentType extends FieldValues> {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: {};
  placeholder?: string;
  secureTextEntry?: boolean;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: "number-pad" | "default";
  PrefixIconSvg?: FC<SvgProps>;
  containerStyles?: StyleProp<ViewStyle>;
}

function BaseInput<ContentType extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder = "",
  secureTextEntry = false,
  required = false,
  multiline = false,
  keyboardType = "default",
  PrefixIconSvg,
  containerStyles
}: IBaseInput<ContentType>) {
  const { Layout, Colors } = useTheme();
  const styles = useMemo(() => stylesFn(Colors), [Colors]);
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? `${name} is required` : false,
        ...rules,
      }}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              !!PrefixIconSvg && [Layout.row, Layout.alignItemsCenter],
              containerStyles && containerStyles
            ]}
          >
            {!!PrefixIconSvg && (
              <PrefixIconSvg
                width={16}
                height={16}
                style={[styles.icon, styles.iconPrefix]}
              />
            )}
            <TextInput
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={Colors.placeholderTextColor}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              multiline={multiline}
              keyboardType={keyboardType}
            />
          </View>
          {error && (
            <BaseText style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </BaseText>
          )}
        </>
      )}
    />
  );
}

const stylesFn = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.primaryDark,
      width: "100%",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    input: {
      minHeight: 50,
      color: Colors.white,
    },
    icon: {
      flex: 0,
      height: 16,
      width: 16,
    },
    iconPrefix: {
      marginHorizontal: 12,
    },
  });

export default BaseInput;
