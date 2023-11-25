import { StyleSheet } from 'react-native';
import { ThemeMetricsSizes, ThemeVariables, UnionToIntersection } from './theme.types';
import { MetricsSizes } from './Variables';

interface TBaseGutterMap {
  BMargin: {
    marginBottom: number,
  },
  TMargin: {
    marginTop: number,
  },
  RMargin: {
    marginRight: number,
  },
  LMargin: {
    marginLeft: number,
  },
  VMargin: {
    marginVertical: number,
  },
  HMargin: {
    marginHorizontal: number,
  },
  Margin: {
    margin: number,
  },
  /* Paddings */
  BPadding: {
    paddingBottom: number,
  },
  TPadding: {
    paddingTop: number,
  },
  RPadding: {
    paddingRight: number,
  },
  LPadding: {
    paddingLeft: number,
  },
  VPadding: {
    paddingVertical: number,
  },
  HPadding: {
    paddingHorizontal: number,
  },
  Padding: {
    padding: number,
  },
}

type TMetricGutterMap<MS extends string> = {
  [ P in keyof TBaseGutterMap as `${MS}${P}` ]: TBaseGutterMap[P]
}

type TUnionMetricGutterMap<U extends string> = {
  [K in U]: TMetricGutterMap<K>
}[U];

type TGutterKeys = keyof ThemeMetricsSizes;

type TGuttersUnion = TUnionMetricGutterMap<TGutterKeys>;

type TGutters = UnionToIntersection<TGuttersUnion>;

const Gutters: TGutters = StyleSheet.create( {
    ...Object.entries( MetricsSizes ).reduce(
      ( acc, [ key, value ] ) => ( {
        ...acc,
        /* Margins */
        [ `${key}BMargin` ]: {
          marginBottom: value,
        },
        [ `${key}TMargin` ]: {
          marginTop: value,
        },
        [ `${key}RMargin` ]: {
          marginRight: value,
        },
        [ `${key}LMargin` ]: {
          marginLeft: value,
        },
        [ `${key}VMargin` ]: {
          marginVertical: value,
        },
        [ `${key}HMargin` ]: {
          marginHorizontal: value,
        },
        [ `${key}Margin` ]: {
          margin: value,
        },
        /* Paddings */
        [ `${key}BPadding` ]: {
          paddingBottom: value,
        },
        [ `${key}TPadding` ]: {
          paddingTop: value,
        },
        [ `${key}RPadding` ]: {
          paddingRight: value,
        },
        [ `${key}LPadding` ]: {
          paddingLeft: value,
        },
        [ `${key}VPadding` ]: {
          paddingVertical: value,
        },
        [ `${key}HPadding` ]: {
          paddingHorizontal: value,
        },
        [ `${key}Padding` ]: {
          padding: value,
        },
      } ),
      {},
    ),
  } ) as TGutters;

export default Gutters;
