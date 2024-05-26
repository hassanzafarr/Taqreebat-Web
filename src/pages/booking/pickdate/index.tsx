import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Pickdate.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Info from "@/components/homecard/homecard";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from "next/router";
import { TimePicker } from "@mui/x-date-pickers";
import CustomDatePicker from "@/components/customDatePicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTimePicker from "@/components/customTimePicker";
import { useRecoilState } from "recoil";
import { bookingRequest } from "@/helper/middlewareStates";
import { formatDate, formatTime } from "@/helper/helper";

const BookPage = () => {
  const router = useRouter();
  const [bookingPayload, setBookingPayload] = useRecoilState(bookingRequest);

  const defaultValues = {
    bookingDate: "",
    bookingTime: "",
  };
  const goBack = () => {
    router.back();
  };
  const schema = yup.object().shape({
    bookingDate: yup.date().required("Date is required"),
    bookingTime: yup.string().required("Time is required"),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (form: any) => {
    setBookingPayload({
      ...bookingPayload,
      bookingDate: formatDate(form.bookingDate),
      bookingTime: formatTime(form.bookingTime),
    });
    router.push("/booking/eventType");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.firstContainerMain}>
          <div className={styles.section__padding1}>
            <div className={styles.subContainer}>
              <div className={styles.searchImage}>
                <Image
                  src="/images/clock.svg"
                  alt="prof"
                  width={400}
                  height={400}
                />
              </div>
              {/* <p>Hello</p> */}
              <div className={styles.searchContent}>
                <p className={styles.mainhead}>
                  <b> Pick Your Date </b>
                </p>
                <div className={styles.searchFieldButton}>
                  <Stack gap={2}>
                    <CustomDatePicker
                      control={control}
                      name="bookingDate"
                      required={false}
                      label="Booking Date"
                      errors={errors}
                    />
                    <CustomTimePicker
                      control={control}
                      name="bookingTime"
                      required={false}
                      label="Booking Time"
                      errors={errors}
                    />
                  </Stack>
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
      </form>
    </>
  );
};

export default BookPage;
