import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Budget.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Info from "@/components/homecard/homecard";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { bookingRequest } from "@/helper/middlewareStates";
import { swalPopUp } from "@/helper/helper";

const BookPage = () => {
  const router = useRouter();

  const [budget, setBudget] = useState(0);
  const [bookingPayload, setBookingPayload] = useRecoilState(bookingRequest);

  const handleBooking = () => {
    if (budget < 10) {
      swalPopUp("Missing", "no of guest should be atleast 10", "warning");
    } else {
      setBookingPayload({
        ...bookingPayload,
        personCount: budget,
        bookingDetail: {
          ...bookingPayload.bookingDetail,
          totalPrice:
            bookingPayload.bookingDetail.unit !== "Fixed"
              ? bookingPayload.bookingDetail.actualPrice * budget
              : bookingPayload.bookingDetail.actualPrice,
        },
      });

      router.push("/booking/pickdate");
    }
  };

  return (
    <>
      <div className={styles.firstContainerMain}>
        <div className={styles.section__padding1}>
          <div className={styles.subContainer}>
            <div className={styles.searchImage}>
              <Image
                src="/images/guests.svg"
                alt="prof"
                width={400}
                height={400}
              />
            </div>
            {/* <p>Hello</p> */}
            <div className={styles.searchContent}>
              <p className={styles.mainhead}>
                <b> Enter Your No. Of Guests </b>
              </p>
              <div className={styles.searchFieldButton}>
                <CustomInputUnControlled
                  size="medium"
                  name="noOfGuests"
                  title="No of Guests"
                  value={budget}
                  type="string"
                  showAdornment={true}
                  // icon={<SearchIcon />}
                  handleAdvanceChange={(e: any) => setBudget(e.target.value)}
                  onEndAdornmentClick={() => console.log("Clicked")}
                />
                <Stack direction={"row"} gap={2}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                    onClick={() => alert("working")}
                    sx={{
                      mt: 2,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 200,
                      fontSize: "1.2rem",
                      borderColor: "#672C70",
                      color: "#672C70",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: "8px",
                      background: "#672C70",
                      boxShadow: "rgba(76, 78, 100, 0.42) 0px 4px 8px -4px;",
                      textTransform: "none",
                      fontWeight: 200,
                      fontSize: "1.2rem",
                      backgroundColor: "#672C70",
                      "&:hover": {
                        background: "#520E5C",
                      },
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPage;
