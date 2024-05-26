import { useState } from "react";
import { atom, useRecoilState } from "recoil";

type CartData = {
  name: String;
  price: number;
  unit: String;
  images: [String];
  _id: String;
  qty: number;
  type: String;
};

const cartItems = atom<CartData[]>({
  key: "cartItems",
  default: [],
});

const useCart = () => {
  //states
  const [cartItem, setCartItems] = useRecoilState(cartItems);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  //states Handlers

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };
  const handleSnackBarOpen = () => {
    setOpenSnackbar(true);
  };

  const handleQuantityChange = (index: any, value: any) => {
    setCartItems((prevItems) => {
      const updatedItems: any = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        qty: parseInt(value),
      };
      return updatedItems;
    });
  };

  const toCart = (item: any) => {
    const { name, price, unit, images, _id, type } = item;

    const cartItemData: CartData = {
      name,
      price,
      unit,
      images,
      _id,
      type,
      qty: 1,
    };

    setCartItems((prevState) => {
      const existingItem = prevState.find((cartItem) => cartItem._id === _id);
      console.log("existingItem ", existingItem);
      if (existingItem) {
        const updatedItems = prevState.map((cartItem) =>
          cartItem._id === _id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
        return updatedItems;
      } else {
        return [...prevState, cartItemData];
      }
    });
    handleSnackBarOpen();
  };

  const handleDelete = (itemIndex: any) => {
    const updatedCart = [...cartItem];
    updatedCart.splice(itemIndex, 1);
    setCartItems(updatedCart);
  };
  const calculateTotalPrice = () => {
    const total = cartItem.reduce((acc, item, index) => {
      const itemPrice = item.price;
      const itemQuantity = item.qty;
      return acc + itemPrice * itemQuantity;
    }, 0);
    return total;
  };
  //return states and there handlers

  return {
    cartItem,
    setCartItems,
    toCart,
    handleQuantityChange,
    handleDelete,
    openSnackbar,
    handleSnackBarClose,
    calculateTotalPrice,
  };
};

export default useCart;
