import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Decor.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Info from "@/components/homecard/homecard";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
const BookPage = () => {
  const [budget, setBudget] = useState();
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
                src="/images/decor.svg"
                alt="prof"
                width={400}
                height={400}
              />
            </div>
            {/* <p>Hello</p> */}
            <div className={styles.searchContent}>
              <p>
                <b> Decoration </b>
              </p>
              <div className={styles.searchFieldButton}>
                <CustomInputUnControlled
                  size="medium"
                  name="budget"
                  title="Budget"
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
    </>
  );
};

export default BookPage;
