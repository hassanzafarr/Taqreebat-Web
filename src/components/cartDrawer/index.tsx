import {
  Box,
  BoxProps,
  Button,
  Divider,
  Grid,
  IconButton,
  SwipeableDrawer,
  Typography,
  ThemeProvider,
  Theme,
  createTheme,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Poppins } from "next/font/google";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useRecoilState } from "recoil";
import { Close } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { showSwipeableDrawerAtom } from "@/helper/middlewareStates";
import { useRouter } from "next/router";
import CustomInputUnControlled from "../customInputUncontrolled";
import useCart from "../hooks";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { askConfirmationPopUp } from "@/helper/helper";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function CartDrawer() {
  const [cartDrawerState, setCartDrawerState] = useRecoilState(
    showSwipeableDrawerAtom
  );
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: `var(--font-poppins)`,
        textTransform: "none",
        fontSize: 16,
      },
    },
  });
  const router: any = useRouter();
  const { cartItem, handleQuantityChange, handleDelete } = useCart();
  const initialValues: any = {
    category: "",
    itemName: "",
    price: "",
    unit: "",
  };

  const scrollbarStyles = (theme: Theme) => ({
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: "auto",
    scrollbarWidth: "thin", // For Firefox
    scrollbarColor: "#888 transparent", // For Firefox
    "&::-webkit-scrollbar": {
      width: "6px",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  });

  const Header = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    paddingBottom: 2,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  }));

  const Footer = styled(Box)<BoxProps>(({ theme }) => ({
    // display: 'flex',
    // alignItems: 'center',
    // paddingBottom: 10,
    // paddingTop:10,
    // justifyContent: 'space-between',
    backgroundColor: "#f7f7f9",
    // position: 'fixed',
    // width: '100%',
    bottom: 0,
  }));

  const validationSchema: any = Yup.object().shape({
    category: Yup.string().required("Food Category is required"),
    itemName: Yup.string().required("Food Item is required"),
    price: Yup.number().required("Price is required"),
    unit: Yup.string().required("Unit is required"),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  console.log("cartItem", cartItem);

  const customURLImage = (imageUrl: string) => (
    <img
      src={imageUrl}
      alt="Network Image"
      style={{ width: "60px", height: "60px", borderRadius: "16px" }}
    />
  );

  const getPrice = (price: any, quantity: any) => {
    let total = price * quantity;
    return `Rs. ${total} `;
  };

  // const handleQuantityChange = (index: any, value: any) => {
  //   setCartItems((prevItems) => {
  //     const updatedItems: any = [...prevItems]; // Create a shallow copy of the items array
  //     updatedItems[index] = {
  //       ...updatedItems[index], // Create a shallow copy of the item to update
  //       qty: parseInt(value), // Update the qty property
  //     };
  //     console.log("updatedCart", updatedItems);
  //     return updatedItems;
  //   });
  // };

  // const handleDelete = (itemIndex: any) => {
  //   const updatedCart = [...cartItem];
  //   updatedCart.splice(itemIndex, 1); // Remove the item at the specified index
  //   setCartItems(updatedCart);
  // };

  const calculateTotalPrice = () => {
    const total = cartItem.reduce((acc, item, index) => {
      const itemPrice = item.price;
      const itemQuantity = item.qty;
      return acc + itemPrice * itemQuantity;
    }, 0);
    return total;
  };

  const handleProceed = async () => {
    const token = localStorage.getItem("Bearer");
    setCartDrawerState(false);
    if (token === null || token === "" || token === undefined) {
      const { isConfirmed } = await askConfirmationPopUp(
        "Not Signed In",
        "To proceed booking you must first login",
        "warning",
        "login"
      );
      if (isConfirmed) {
        router.push("login");
      }
    } else {
      router.push("/booking/pickdate");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={`${poppins.variable}`}>
        <SwipeableDrawer
          disableSwipeToOpen={false}
          swipeAreaWidth={10}
          sx={{
            "& .MuiDrawer-paper": {
              background: "#fff",
              width: { xs: 300, sm: 400 },
              borderTopLeftRadius: "18px",
              borderBottomLeftRadius: "18px",
              boxSizing: "border-box",
              boxShadow: "4px 0px 5px rgba(136, 136, 136, 0.5)",
              overflow: "hidden",
              padding: 2,
            },
          }}
          anchor={"right"}
          open={cartDrawerState}
          onClose={() => setCartDrawerState(false)}
          onOpen={() => setCartDrawerState(true)}
        >
          <Header>
            <Typography
              fontSize={20}
              sx={{ fontFamily: "Poppins, sans-serif" }}
            >
              Your Cart
            </Typography>
            <Close
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={() => setCartDrawerState(false)}
            />
          </Header>

          <Divider sx={{ mt: 1, mb: 2 }} />

          <Box sx={scrollbarStyles}>
            <Grid container spacing={2} sx={{ pb: 5 }}>
              {cartItem.length > 0 ? (
                <>
                  {cartItem.map((item: any, index: any) => (
                    <>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {customURLImage(item.images[0])}
                            <Typography
                              sx={{
                                ml: 2,
                                fontWeight: "bold",
                                fontFamily: "poppins",
                              }}
                            >
                              {item?.name}
                            </Typography>
                          </Box>

                          <IconButton
                            sx={{ color: "#672C70" }}
                            onClick={() => handleDelete(index)}
                          >
                            <DeleteOutlineOutlinedIcon
                              style={{ fontSize: "1.2rem" }}
                            />
                          </IconButton>
                        </Box>
                      </Grid>
                      {item.type !== "package" && (
                        <Grid item xs={6}>
                          <CustomInputUnControlled
                            size="small"
                            name="qty"
                            title="Qty"
                            value={item.qty}
                            type="number"
                            handleAdvanceChange={(e: any) =>
                              handleQuantityChange(index, e.target.value)
                            }
                          />
                        </Grid>
                      )}
                      {/* <Grid item xs={6}>
                        <CustomInputUnControlled
                          size="small"
                          name="qty"
                          title="Qty"
                          value={item.qty}
                          type="number"
                          handleAdvanceChange={(e: any) =>
                            handleQuantityChange(index, e.target.value)
                          }
                        />
                      </Grid> */}

                      <Grid item xs={12}>
                        <Divider sx={{ mt: 1 }} />
                      </Grid>
                    </>
                  ))}
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                    fontSize={18}
                  >
                    Your Cart Is Empty
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          <Footer>
            <Box>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Typography
                  sx={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    // color: "#672C70",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Rs.
                  {calculateTotalPrice()}
                </Typography>
              </Grid>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Button
                variant="contained"
                disabled={router.pathname == "/createBooking"}
                size={"medium"}
                onClick={handleProceed}
                sx={{
                  width: "100%",
                  "&:hover": { background: "#520E5C" },
                  background: "#672C70",
                  textTransform: "none",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Proceed
              </Button>
            </Box>
          </Footer>
        </SwipeableDrawer>
      </main>
    </ThemeProvider>
  );
}
