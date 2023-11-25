
export type RootParamList  = {
  HomeStack: undefined,
  Categories: undefined,
  Favourites: undefined,
  More: undefined,
}
export type HomeStackParamList = {
  Home: undefined;
  Product: {
    id: string
  };
  Cart: undefined;
};

export type AdminStackParamList = {
  AdminHome: undefined;
  AddProduct: undefined;
  AllProducts: undefined;
}

export type CustomerStackParamList = {
  CustomerHome: undefined;
  Cart: undefined;
}