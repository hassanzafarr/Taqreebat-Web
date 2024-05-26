import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Slider from "react-slick";
import styles from "./Featured.module.css";
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@mui/icons-material/Star";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { services } from "@/helper/contants";
import axios from "axios";
import Endpoints from "@/helper/endpoints";
import { swalPopUp } from "@/helper/helper";
import { useRouter } from "next/router";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronRightIcon sx={{ color: "#672C70", fontSize: "44px" }} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronLeft
        sx={{ color: "#672C70", fontSize: "44px", marginLeft: "-20px" }}
      />
    </div>
  );
}

const FeaturedSection = ({type}:any) => {

  const router = useRouter();

  const [bussiness, setBussiness] = useState([]);
  const [chipData, setChipData] = useState(services[0]);

  console.log("bussiness", bussiness);

  const getAllBussiness = async () => {
    try {
      const response = await axios.get(
        Endpoints.featuredVendors + `?type=${chipData.name}`
      );
      const { content } = response.data;
      console.log(content);
      setBussiness(content);
      // setLoading(false);
    } catch (error: any) {
      console.log("error ", error);
      // setLoading(false);
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

  const handleVendorProfile = (item: any) => {
    console.log("type", item);
    router.push({
      pathname: "/vendorProfile",
      query: `type=${item?.BussinessDetail?.bnType}&vendorId=${item?._id}`,
    });
  };

  const handleChip = (value: any) => {
    console.log("value", value);
    setChipData({ name: value });
  };

  console.log("chipData", chipData);

  useEffect(() => {
    getAllBussiness();
  }, []);

  useEffect(() => {
    getAllBussiness();
  }, [chipData]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleViewAll = () => {
    router.push("/vendorPackages?type=featured");
  };

  return (
    <>
      {/* <Grid container spacing={2}> */}
      {/* <div style={{ maxWidth: "100%", margin: "0 auto" }}> */}
      <div className={styles.section__padding1}>
        <div className={styles.vendorCard_text}>
          <h3>Featured</h3>
          <div>
            <Button
              variant="text"
              sx={{
                color: "#520e5c",
                textTransform: "none",
                cursor: "pointer",
                fontFamily: `var(--font-poppins)`,
              }}
              onClick={handleViewAll}
            >
              View All
            </Button>
          </div>
        </div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Box
                sx={{
                  // display: "flex",
                  // alignItems: "center",
                  //   justifyContent: "space-between",
                }}
              >
                {services.map((item, key) => (
                  <>
                    <Chip
                      label={item.name}
                      onClick={() => handleChip(item.name)}
                      sx={{
                        color: chipData.name == item.name ? "#fff" : "#37474F",
                        border: 1,
                        backgroundColor:
                          chipData.name == item.name ? "#672C70" : "#fff",
                        borderColor:
                          chipData.name == item.name ? "#672C70" : "#37474F",
                        cursor: "pointer",
                        borderRadius: 1,
                        mr: 2,
                        mt:1,
                        fontFamily: `var(--font-poppins)`,
                      }}
                    />
                  </>
                ))}
              </Box>
            </Grid>
          </Grid>
        </div>
        {bussiness.length > 0 ? (
          <Slider {...settings}>
            {bussiness.map((item, index) => (
              <div key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    cursor: "pointer",
                    boxShadow:
                      "#863d9157 0px 0px 2px 0px, #5983ad33 0px 12px 24px -4px",
                    height: 260,
                    margin: "1rem",
                  }}
                  onClick={() => handleVendorProfile(item)}
                >
                  <Box>
                    <CardMedia
                      component="img"
                      height="170"
                      image={item?.BussinessDetail?.bnlogo}
                      alt="Paella dish"
                    />
                  </Box>

                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#37474F",
                          fontSize: "15px",
                          fontWeight: "bold",
                          fontFamily: `var(--font-poppins)`,
                        }}
                      >
                        {item?.BussinessDetail?.BussinessName}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <StarIcon sx={{ color: "#ffb413", fontSize: "14px" }} />
                        <Typography
                          sx={{
                            color: "#37474F",
                            fontSize: "12px",
                            ml: 1,
                            fontFamily: `var(--font-poppins)`,
                          }}
                        >
                          {item?.BussinessDetail?.ratingInfo?.totalRating.toString()?.slice(0, 3)}(
                          {item?.BussinessDetail?.ratingInfo?.reviews?.length})
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "#37474F",
                        fontSize: "0.8rem",
                        fontFamily: `var(--font-poppins)`,
                      }}
                    >
                      Service: {item?.BussinessDetail?.bnType}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <Typography sx={{ fontWeight: "bold", marginTop: 5 }}>
            No Featured Vendors
          </Typography>
        )}
      </div>

      {/* </Grid> */}
    </>
  );
};

export default FeaturedSection;
