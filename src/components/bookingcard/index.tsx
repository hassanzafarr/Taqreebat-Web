import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import styles from "./Bookingcard.module.css";
import { useEffect, useState } from "react";
import burger from "@/images/burger.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@mui/icons-material/Star";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import banquet1 from "../../../images/banquet1.png";
const BookingCard = (props: any) => {
  const router = useRouter();
  const { bookings,handleBooking } = props;
  return (
    <Grid container spacing={2}>
      {bookings && bookings.length ? (
        bookings.map((booking: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                height={150}
                component="img"
                // image="images/banquet1.png"
                src={booking.vendorId.BussinessDetail.bnlogo}
                alt="Business Image"
              />
              <CardContent>
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <Stack sx={{ width: "60%" }}>
                    <Typography
                      component="div"
                      variant="h5"
                      sx={{
                        color: "#37474f",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      {booking.vendorId.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ color: "#37474f" }}
                    >
                      <b> Event </b>: {booking.typeofEvent}
                    </Typography>
                    {/* <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ color: "#37474f" }}
                    >
                      <b> Person Count </b>: {booking.personCount}
                    </Typography> */}
                    
                    <Button
                  variant="contained"
                  size={"small"}
                  sx={{
                    borderColor: "#672C70",
                    width:'70%',
                    color: "#fff",
                    background: "#672C70",
                    textTransform: "none",
                    "&:hover": {
                      background: "#520E5C",
                      borderColor: "#520E5C",
                      color: "#fff",
                    },
                  }}
                  onClick={()=>handleBooking(booking)}
                  // onClick={handleClick({ vertical: 'top', horizontal: 'right' })}
                >
                  Send Payment
                </Button>
                  </Stack>

                  <Stack>
                    <Box>
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{ color: "#37474f", fontWeight: "600" }}
                      >
                        Rs. {booking.paymentInfo.totalAmount} 
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ color: "#37474f" }}
                      >
                        Date: {booking.bookingDate}
                      </Typography>
                      
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      sx={{ color: "#37474f" }}
                    >
                      <b> Person Count </b>: {booking.personCount}
                    </Typography>
                    
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Box sx={{ m: 1 }}>
            <Typography>No Bookings Found</Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BookingCard;
