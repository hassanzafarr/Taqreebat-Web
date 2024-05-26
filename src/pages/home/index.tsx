`use client`;

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./Home.module.css";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const [searchData, setSearchData] = useState();
  return (
    <>
      <div className={styles.firstContainerMain}>
        <div className={styles.section__padding1}>
          <div className={styles.subContainer}>
            {/* <p>Hello</p> */}
            <div className={styles.searchContent}>
              <p>
                Find & Book the <b> Best Management </b> For Every Special Event
              </p>
              <div className={styles.searchFieldButton}>
                <CustomInputUnControlled
                  size="small"
                  name="search"
                  title="Search"
                  value={searchData}
                  neumorphism={true}
                  type="string"
                  showAdornment={true}
                  icon={<SearchIcon />}
                  handleAdvanceChange={(e: any) =>
                    setSearchData(e.target.value)
                  }
                  onEndAdornmentClick={() => console.log("Clicked")}
                />
              </div>
            </div>

            <div className={styles.searchImage}>
              <Image
                src="/images/mainwed.svg"
                alt="prof"
                width={350}
                height={350}
                className={styles.rightImage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
