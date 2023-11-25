import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { ICartProduct } from "../Components/Cart/CartListItem";

interface CartContextProps {
  cart: ICartProduct[];
  addToCart: (item: ICartProduct) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: function (item: ICartProduct): void {
    throw new Error("Function not implemented.");
  },
  removeFromCart: function (itemId: number): void {
    throw new Error("Function not implemented.");
  },
  clearCart: function (): void {
    throw new Error("Function not implemented.");
  },
});

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<ICartProduct[]>([]);

  const addToCart = (item: ICartProduct) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        const updatedCart = cart.map((cartItem) => {
          if (cartItem.id === itemId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
        setCart(updatedCart);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
