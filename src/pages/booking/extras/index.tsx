import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Extraas.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Info from "@/components/homecard/homecard";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import { useState } from "react";

import {
  Button,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTimePicker from "@/components/customTimePicker";
import { useRecoilState } from "recoil";
import { bookingRequest } from "@/helper/middlewareStates";
import { askConfirmationPopUp, swalPopUp } from "@/helper/helper";
import axios from "axios";
import Endpoints from "@/helper/endpoints";
import { useRouter } from "next/router";
import useCart from "@/components/hooks";

const BookPage = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [bookingPayload, setBookingPayload] = useRecoilState(bookingRequest);

  const { setCartItems } = useCart();

  const handleSubmit = async () => {
    setBookingPayload({
      ...bookingPayload,
      extras: [description],
    });

    try {
      // setLoading(true);
      const request: any = {
        ...bookingPayload,
        extras: [description],
      };

      const confirmation = await askConfirmationPopUp(
        "Alert!",
        "Are you sure you want to confirm your order?",
        "alert",
        "Confirm"
      );
      console.log("result", confirmation);

      if (confirmation.isConfirmed) {
        try {
          const response = await axios.post(Endpoints.booking, request, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Bearer"),
            },
          });

          if (response.status === 200 || response.status === 201) {
            // Delete was successful, show success message
            swalPopUp(
              "Success",
              "Your Booking request has been sent to the vendor",
              "success"
            );
            router.push("/");
            setCartItems([]);
            // pageReload();
          } else {
            swalPopUp("Alert", "Something went wrong", "error");
          }
        } catch (error) {
          console.error("Internal Server Error", error);
          swalPopUp("server", "External server error", "error");
        } finally {
          // setLoading(false);
        }
      } else {
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error", error);
      // setLoading(false);
    }
  };
  const goBack = () => {
    router.back();
  };
  return (
    <>
      <div className={styles.firstContainerMain}>
        <div className={styles.section__padding1}>
          <div className={styles.subContainer}>
            <div className={styles.searchImage}>
              <Image
                src="/images/extras.svg"
                alt="prof"
                width={400}
                height={400}
              />
            </div>
            {/* <p>Hello</p> */}
            <div className={styles.searchContent}>
              <p>
                <b>Extras </b>
              </p>
              <div style={{ marginTop: "1rem" }}>
                <CustomInputUnControlled
                  size="small"
                  name="description"
                  title="Description (Optional)"
                  value={description}
                  type="number"
                  multiline
                  minRows={4}
                  handleAdvanceChange={(e: any) =>
                    setDescription(e.target.value)
                  }
                />
              </div>
              <div className={styles.searchFieldButton}>
                <Stack direction={"row"} gap={2}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 200,
                      fontSize: "1.2rem",
                      borderColor: "#672C70",
                      color: "#672C70",
                    }}
                    onClick={goBack}
                  >
                    Back
                  </Button>
                  <Button
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
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
                    Submit
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
