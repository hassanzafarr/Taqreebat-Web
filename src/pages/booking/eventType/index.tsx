import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Event.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Info from "@/components/homecard/homecard";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import CustomSelect from "@/components/customSelect";
import { typeOfEvents } from "@/helper/contants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookingRequest } from "@/helper/middlewareStates";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

const BookPage = () => {
  const router = useRouter();
  const [bookingPayload, setBookingPayload] = useRecoilState(bookingRequest);

  const defaultValues = {
    typeOfEvent: "",
  };

  const schema = yup.object().shape({
    typeOfEvent: yup.string().required("Type Of Event is required"),
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
      typeofEvent: form.typeOfEvent,
    });
    router.push("/booking/extras");
  };
  const goBack = () => {
    router.back();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.firstContainerMain}>
          <div className={styles.section__padding1}>
            <div className={styles.subContainer}>
              <div className={styles.searchImage}>
                <Image
                  src="/images/event.svg"
                  alt="prof"
                  width={400}
                  height={400}
                />
              </div>
              {/* <p>Hello</p> */}
              <div className={styles.searchContent}>
                <p className={styles.mainhead}>
                  <b> Type Of Events </b>
                </p>
                <div className={styles.searchFieldButton}>
                  <CustomSelect
                    control={control}
                    options={typeOfEvents}
                    // size={"small"}
                    name={"typeOfEvent"}
                    label={"Type Of Event"}
                    errors={errors}
                  />
                  {/* <CustomInputUnControlled
                  size="medium"
                  name="budget"
                  title="Budget"
                  value={budget}
                  type="string"
                  showAdornment={true}
                  // icon={<SearchIcon />}
                  handleAdvanceChange={(e: any) => setBudget(e.target.value)}
                  onEndAdornmentClick={() => console.log("Clicked")}
                /> */}
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
