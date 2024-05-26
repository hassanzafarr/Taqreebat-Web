import React from "react";
import { Box, Chip, Grid, Typography, Skeleton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import VendorCard from "@/components/vendorCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import Endpoints from "@/helper/endpoints";
import { askConfirmationPopUp, swalPopUp } from "@/helper/helper";
import axios from "axios";
import { useRouter } from "next/router";
import BookingCard from "@/components/bookingcard";
import CustomLoader from "@/components/customLoader";
import CustomDialogBox from "@/components/customDialogBox";

const MyBooking = () => {
  const [searchData, setSearchData] = useState();

  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [cardNumber, setCardNumber] = useState("1234");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [payment, setPayment] = useState("");
  const [bookingId, setBookingId] = useState<any>();

  const [booking, setBooking] = useState([]);
  const [dialogState, setDialogState] = useState(false);
  const router = useRouter();
  // const { type } = router.query;

  const getBookings = async () => {
    try {
      setReload(true);
      const response = await axios.get(Endpoints.getBookings, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      });
      const { content } = response.data;
      console.log(content);
      setBooking(content);
      setReload(false);
      setLoading(false);
    } catch (error: any) {
      console.log("error ", error);
      setLoading(false);
      setReload(false);
      if (typeof error.response === "undefined") {
        swalPopUp("server", "External server not available", "error");
        return;
      } else {
        swalPopUp(
          error?.response?.request.statusText,
          error?.response.data.message,
          "error"
        );
      }
    }
  };
  useEffect(() => {
    getBookings();
  }, []);

  const handleCloseDialog = () => {
    setDialogState(false);
  };

  const openDialog = (booking: any) => {
    setBookingId(booking);
    setDialogState(true);
  };

  const handleSendPayment = async () => {
    setDialogState(false);
    console.log("getboook", bookingId);

    try {
      let newRequest = {
        bookingId: bookingId._id,
        paymentRecieved: parseInt(payment),
      };

      const { isConfirmed } = await askConfirmationPopUp(
        "Alert",
        "Confirm to send payment?",
        "warning",
        "Yes"
      );
      if (isConfirmed) {
        setLoading(true);
        const response = await axios.post(
          `${Endpoints.addPayment}`,
          newRequest,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Bearer"),
            },
          }
        );
        setPayment("");
        setCvv("");
        setCardNumber("");
        setExpiry("");
        setName("");
        setLoading(false);
        swalPopUp("Payment Updated", "The Payment is added!", "success");

        console.log("payment", newRequest);

        // getBookings();
        if (!response) throw "Something went wrong";

        if (response.status !== 200) {
          return console.warn("Api failed");
        }
      }
    } catch (error: any) {
      setLoading(false);
      swalPopUp("Alert", error, "error");
      console.warn("Errror", error);
    }
  };

  return (
    <>
      <CustomLoader loading={reload} />
      <CustomDialogBox
        handleClose={handleCloseDialog}
        open={dialogState}
        title={"Add Payment"}
        content={
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomInputUnControlled
                  size="small"
                  name="nameonCard"
                  title="Name on Card"
                  showAdornment={false}
                  value={name}
                  type="text"
                  handleAdvanceChange={(e: any) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputUnControlled
                  size="small"
                  name="cardNumber"
                  title="Card Number"
                  value={cardNumber}
                  type="text"
                  handleAdvanceChange={(e: any) =>
                    setCardNumber(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={6} md={6}>
                <CustomInputUnControlled
                  size="small"
                  name="cardNumber"
                  title="CVV"
                  value={cvv}
                  type="text"
                  handleAdvanceChange={(e: any) => setCvv(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} md={6}>
                <CustomInputUnControlled
                  size="small"
                  name="cardNumber"
                  title="Expiry"
                  value={expiry}
                  type="text"
                  handleAdvanceChange={(e: any) => setExpiry(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomInputUnControlled
                  size="small"
                  name="payment"
                  title="No Of Guest"
                  value={payment}
                  type="text"
                  handleAdvanceChange={(e: any) => setPayment(e.target.value)}
                />
              </Grid>
            </Grid>
          </>
        }
        actions={
          <>
            <Button
              variant="outlined"
              size={"medium"}
              sx={{
                borderColor: "#672C70",
                color: "#672C70",
                // width: "100%",
                textTransform: "none",
                "&:hover": {
                  background: "#672C70",
                  borderColor: "#672C70",
                  color: "#fff",
                },
              }}
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              size={"medium"}
              sx={{
                backgroundColor: "#672C70",
                color: "#fff",
                // width: "100%",
                textTransform: "none",
                "&:hover": {
                  background: "#520E5C",
                  borderColor: "#520E5C",
                  color: "#fff",
                },
              }}
              type="submit"
              // onClick={() => handleAddPayment(rowID)}
              onClick={handleSendPayment}
              variant="contained"
            >
              Save
            </Button>
          </>
        }
      />

      <Grid container spacing={2} sx={{ padding: 4, background: "#fff" }}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Chip
              label={"All"}
              sx={{
                width: "80px",
                borderRadius: 1,
                color: "#252525",
                mr: 2,
                background: "#fff",
                border: 1,
                borderColor: "#252525",
                fontFamily: `var(--font-poppins)`,
              }}
            />
            <Chip
              label={"Filters"}
              sx={{
                width: "90px",
                borderRadius: 1,
                color: "#252525",
                mr: 2,
                background: "#fff",
                border: 1,
                borderColor: "#252525",
                fontFamily: `var(--font-poppins)`,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          {loading ? (
            <Grid container spacing={2}>
              {[...Array(2)].map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    animation="wave"
                  />
                  <Skeleton variant="text" height={30} animation="wave" />
                  <Skeleton variant="text" height={20} animation="wave" />
                </Grid>
              ))}
            </Grid>
          ) : booking && booking.length ? (
            <BookingCard bookings={booking} handleBooking={openDialog} />
          ) : (
            <Box sx={{ m: 2, textAlign: "center" }}>
              <Typography>No Booking Found</Typography>
            </Box>
          )}
        </Grid>
        {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              sx={{ color: "#fff" }}
              count={10}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Grid> */}
      </Grid>
    </>
  );
};

export default MyBooking;
