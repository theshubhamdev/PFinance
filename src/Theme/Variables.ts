export const FontSize = {
  micro: 12,
  mini: 14,
  small: 16,
  regular: 20,
  midLarge: 27,
  large: 40,
};

const no = 0; // 5
const tiny = 5; // 5
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const midLarge = tiny * 4; // 20
const large = regular * 2; // 30
const extraLarge = regular * 3; // 90

export const MetricsSizes = {
  no,
  tiny,
  small,
  regular,
  midLarge,
  large,
  extraLarge,
};

export default {
  FontSize,
  MetricsSizes,
};
