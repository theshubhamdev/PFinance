import Colors from "./Color";
import { FontSize, MetricsSizes } from "./Variables";

export type UnionToIntersection<T> =
  ( T extends any ? ( x: T ) => any : never ) extends
    (x: infer R) => any ? R : never;
  
export type ThemeMetricsSizes = typeof MetricsSizes;

export type ThemeColors = typeof Colors;

export type ThemeFontSize = typeof FontSize;

export type ThemeVariables = {
  Colors: ThemeColors,
  FontSize: ThemeFontSize,
  MetricsSizes: ThemeMetricsSizes,
}