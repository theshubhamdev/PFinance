import React, { FC, ReactNode, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import colors from '../Theme/Color';

interface Props {
  children: ReactNode,
  onPress?: () => void,
  style?: StyleProp<ViewStyle>,
  shadow?: boolean,
}

const BaseCard: FC<Props> = ( { children, onPress, style, shadow } ) => {
  return (
    <Pressable
      style={[ styles.container, style, shadow ? styles.cardShadow : {} ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding:  8 ,
  },
  cardShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
} );

export default BaseCard;
