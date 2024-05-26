import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Theme.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Info from "@/components/homecard/homecard";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
const themes = [
  { id: 1, name: "Theme 1", imagePath: "/images/theme1.svg" },
  { id: 2, name: "Theme 2", imagePath: "/images/theme2.svg" },
  { id: 3, name: "Theme 3", imagePath: "/images/theme3.svg" },
];

const BookPage = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const handleThemeSelect = (theme: any) => {
    setSelectedTheme(theme);
    console.log("Selected Theme ID:", theme.id);
  };
  return (
    <>
      <div className={styles.firstContainerMain}>
        <div className={styles.section__padding1}>
          <div className={styles.subContainer}>
            {/* <div className={styles.searchImage}>
              <Image
                src="/images/theme.svg"
                alt="prof"
                width={400}
                height={400}
              />
            </div> */}
            {/* <p>Hello</p> */}
            <div className={styles.searchContent}>
              <p>
                <b> Select Your Theme </b>
              </p>
              <div className={styles.searchFieldButton}>
                <div className={styles.themeClass}>
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`${styles.themeItem} ${
                        selectedTheme === theme ? styles.selectedTheme : ""
                      }`}
                      onClick={() => handleThemeSelect(theme)}
                    >
                      <Image
                        src={theme.imagePath}
                        alt={theme.name}
                        width={250}
                        height={150}
                        style={{ objectFit: "contain" }}
                      />
                      <p>{theme.name}</p>
                    </div>
                  ))}
                </div>

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
