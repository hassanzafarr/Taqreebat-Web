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
  Tooltip,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import styles from "./Vendor.module.css";
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@mui/icons-material/Star";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
function SampleNextArrow(props: any) {
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

function SamplePrevArrow(props: any) {
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
const VendorCard = (props: any) => {
  const router = useRouter();

  const { bussiness, type } = props;

  const handleVendorProfile = (item: any) => {
    console.log("type", item);
    router.push({
      pathname: "/vendorProfile",
      query:
        type != "featured"
          ? `type=${item.bnType}&vendorId=${item.vendorId}`
          : `type=${item?.BussinessDetail?.bnType}&vendorId=${item?._id}`,
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        {bussiness.length ? (
          bussiness.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <div key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      cursor: "pointer",
                      boxShadow:
                        "#863d9157 0px 0px 2px 0px, #5983ad33 0px 12px 24px -4px",
                      height: 260,
                      margin: "2rem 0rem 2rem 0rem",
                    }}
                    onClick={() => handleVendorProfile(item)}
                  >
                    <Box>
                      <CardMedia
                        component="img"
                        height="170"
                        image={item.bnlogo || item.BussinessDetail.bnlogo}
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
                          // sx={{
                          //   color: "#37474F",
                          //   fontSize: "15px",
                          //   fontWeight: "500",
                          // }}
                          sx={{
                            color: "#37474f",
                            fontWeight: "600",
                          }}
                        >
                          {item.BussinessName ||
                            item.BussinessDetail.BussinessName}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StarIcon
                            sx={{ color: "#ffb413", fontSize: "14px" }}
                          />
                          <Typography
                            sx={{
                              color: "#37474F",
                              fontSize: "12px",
                              ml: 1,
                            }}
                          >
                            {item?.ratingInfo?.totalRating.toString()?.slice(0, 3) ||
                              item?.BussinessDetail?.ratingInfo?.totalRating.toString()?.slice(0, 3) || 0}
                            (
                            {item?.ratingInfo?.reviews.length ||
                              item?.BussinessDetail?.ratingInfo?.reviews.length || 0}
                            )
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        gutterBottom
                        sx={{
                          color: "#37474F",
                          fontSize: "0.9rem",
                        }}
                      >
                        Service: {item.bnType || item.BussinessDetail.bnType}
                      </Typography>
                      {/* <Typography
                    gutterBottom
                    sx={{
                      color: "#37474F",
                      fontSize: "0.8rem",
                    }}
                  >
                    Rs. 2000
                  </Typography> */}
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            );
          })
        ) : (
          <>
            <Box sx={{ m: 1 }}>
              <Typography>No Vendors Found</Typography>
            </Box>
          </>
        )}
      </Grid>
    </>
  );
};

export default VendorCard;
