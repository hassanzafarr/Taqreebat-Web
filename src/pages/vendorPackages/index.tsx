import React from "react";
import { Box, Chip, Grid, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import VendorCard from "@/components/vendorCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import Endpoints from "@/helper/endpoints";
import { swalPopUp } from "@/helper/helper";
import axios from "axios";
import { useRouter } from "next/router";
import CustomLoader from "@/components/customLoader";

const VendorPackages = () => {
  const [searchData, setSearchData] = useState();
  const [bussiness, setBussiness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const { type } = router.query;

  const getAllBussiness = async (page: any) => {
    try {
      setReload(true);
      const response = await axios.get(
        type != "featured"
          ? Endpoints.bussiness + `?type=${type}&page=${page}`
          : Endpoints.featuredVendors
      );
      const { content } = response.data;
      console.log("content", response);
      setBussiness(content);
      setReload(false);
      setLoading(false);
    } catch (error: any) {
      console.log("error ", error);
      setReload(false);
      setLoading(false);
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

  console.log("bussiness1", bussiness);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (type) {
      // Reset pagination to page 1 when type changes
      setCurrentPage(1);
      getAllBussiness(0); // Assuming page index starts from 0, adjust as needed
    }
  }, [type]);

  useEffect(() => {
    if (type) {
      getAllBussiness(currentPage - 1);
    }
  }, [currentPage, type]);

  return (
    <>
      <CustomLoader loading={reload} />

      <Grid container spacing={2} sx={{ padding: 4, background: "#fff" }}>
        <Grid item xs={12}>
          <Typography
            sx={{ color: "#37474f", fontWeight: "600", fontSize: "18px" }}
          >
            Results for {type}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
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
                background: "#EBECF0",
                fontSize: "14px",
                border: "none",
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
                fontSize: "14px",
                background: "#EBECF0",
                border: "none",
                // borderColor: "#252525",
                // background: "#fff",
                // border: 1,
                borderColor: "#252525",
                fontFamily: `var(--font-poppins)`,
              }}
            />
            <CustomInputUnControlled
              size="small"
              name="search"
              title="Search"
              value={searchData}
              type="string"
              showAdornment={false}
              neumorphism={true}
              handleAdvanceChange={(e: any) => setSearchData(e.target.value)}
              // onEndAdornmentClick={() =>
              //   addChipDetails(
              //     photographyDetails,
              //     setPhotographyData,
              //     setPhotographyDetails
              //   )
              // }
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Grid container spacing={2}>
              {[...Array(10)].map((_, index) => (
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
          ) : bussiness.length ? (
            <VendorCard
              bussiness={bussiness}
              type={type == "featured" ? "featured" : "other"}
            />
          ) : (
            <Box sx={{ m: 2, textAlign: "center" }}>
              <Typography>No Vendors Found</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              sx={{ color: "#fff" }}
              count={10} // Assuming you have a total of 10 pages, adjust as needed
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              // disabled={bussiness.length <= 1}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default VendorPackages;
