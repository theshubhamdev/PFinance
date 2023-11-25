import React, {
    FC,
    ReactNode,
    createContext,
    useContext,
    useState,
  } from "react";
  
  interface FavouriteContextProps {
    favourites: number[];
    updateFavourites: (item: number) => void;
    clearFavourites: () => void;
  }
  
  const FavouriteContext = createContext<FavouriteContextProps>({
    favourites: [],
    updateFavourites: function (item: number): void {
      throw new Error("Function not implemented.");
    },
    clearFavourites: function (): void {
      throw new Error("Function not implemented.");
    },
  });
  
  interface FavouriteProviderProps {
    children: ReactNode;
  }
  
  const FavouriteProvider: FC<FavouriteProviderProps> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
  
    const updateFavourites = (item: number) => {
      const existingItem = favourites.find((favouriteItem) => favouriteItem === item);
        if (existingItem) {
        const updatedFavourite = favourites.filter((favouriteItem) => favouriteItem !== item);
        setFavourites(updatedFavourite);
      } else {
        setFavourites([...favourites, item]);
      }
    };
  
    const clearFavourites = () => {
      setFavourites([]);
    };
  
    return (
      <FavouriteContext.Provider
        value={{ favourites, updateFavourites, clearFavourites }}
      >
        {children}
      </FavouriteContext.Provider>
    );
  };
  
  const useFavourite = () => useContext(FavouriteContext);
  export { useFavourite, FavouriteProvider };
  