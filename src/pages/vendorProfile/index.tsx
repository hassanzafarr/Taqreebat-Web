import React, { useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import VendorCard from "@/components/vendorCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/router";
import axios from "axios";
import Endpoints from "@/helper/endpoints";
import {
  askConfirmationPopUp,
  swalPopUp,
  toastAlert,
  truncateText,
} from "@/helper/helper";
import CustomDialogBox from "@/components/customDialogBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCart from "@/components/hooks";
import { ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import { bookingRequest } from "@/helper/middlewareStates";
import RatingStarComponent from "@/components/ratingStar";
import payloads from "@/helper/payloads";
import VenSlide from "@/components/venueSlider/venslide";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import CustomPhotographerDialogBox from "@/components/customPhotographerModel";

const VendorProfile = () => {
  const [refreash, setRefreash] = useState<any>();
  const [businessDetail, setBusinessDetail] = useState<any>();
  const [vendorDetail, setVendorDetail] = useState<any>();
  const [packageDetail, setPackageDetail] = useState<any>();
  const [guests, setGuests] = useState<number>(50);
  const [packageDialog, setPackageDialog] = useState<boolean>(false);
  const commentRef = useRef<any>();
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const theme = useTheme();
  const breakPoint: any = useMediaQuery(theme.breakpoints.down("md"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { toCart, cartItem, handleSnackBarClose, calculateTotalPrice } =
    useCart();
  const [bookingPayload, setBookingPayload] = useRecoilState(bookingRequest);

  const router = useRouter();
  const queryParams = router.query;
  console.log("cartItem", cartItem);
  const { type, vendorId } = queryParams;

  const arr = [
    "bridal room",
    "waiters",
    "water",
    "Music System",
    "Valet Parking",
    "Wifi",
    "Stage decoration",
  ];

  const handleRatingChange = (num: number) => {
    // setSelectedRating(selectedRating == 1 ? 0 : num);
    setSelectedRating(num);
  };

  const getBusinessDetails = async () => {
    try {
      const response = await axios.post(Endpoints.businessDetails, queryParams);
      const { content } = response.data;
      console.log("content", content);
      setBusinessDetail(response.data.content.bussinessData);
      setVendorDetail(response.data.content.body);
    } catch (error: any) {
      console.log("error ", error);
      if (typeof error.response === "undefined") {
        swalPopUp("Server Error", "External server not available", "error");
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
  const addReview = async () => {
    const token = localStorage.getItem("Bearer");
    if (token) {
      if (selectedRating === 0) {
        swalPopUp(
          "not rated",
          "please rate by clicking on the Star",
          "warning"
        );
      } else {
        // commentRef.current.value = "";
        // setSelectedRating(0);
        try {
          const response = await axios.post(
            Endpoints.addReview,
            payloads.addReviewPayload(
              businessDetail.ratingInfo._id,
              commentRef.current.value,
              selectedRating
            ),
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Bearer"),
              },
            }
          );
          const gotdata = response.data;
          console.log("gotdata", gotdata);
          commentRef.current.value = "";
          setSelectedRating(0);
          setRefreash(null);
        } catch (error: any) {
          console.log("error ", error);
          if (typeof error.response === "undefined") {
            swalPopUp("Server Error", "External server not available", "error");
            return;
          } else {
            swalPopUp(
              error?.response?.request.statusText,
              error?.response.data.message,
              "error"
            );
          }
        }
      }
    } else {
      const { isConfirmed } = await askConfirmationPopUp(
        "Not Signed In",
        "To add a review you must first login",
        "warning",
        "login"
      );
      if (isConfirmed) {
        router.push("login");
      }
    }
  };
  const handleDialog = () => {
    // handleClose();
    setPackageDialog(false);
  };

  const handlePackage = (item: any) => {
    setPackageDetail(item);
    setPackageDialog(true);
  };

  const IncrementGuests = () => {
    setGuests(guests + 1);
  };

  const DecrementGuests = () => {
    setGuests(guests - 1);
  };

  const userRating = (review: any) => {
    console.log("review", review.rated);
    const stars = [];

    for (let i = 0; i < review.rated; i++) {
      stars.push(
        <StarIcon key={i} sx={{ color: "#ffb413", fontSize: "20px" }} />
      );
    }

    return stars;
  };

  console.log("vendorDetail", vendorDetail);

  const AddToCart = (cart: any) => {
    setPackageDialog(false);
    console.log("carty", cart);
    const newCartOb = { ...cart };
    if (queryParams.type === "Caterer") {
      newCartOb.price = !newCartOb.category
        ? guests * newCartOb.price
        : newCartOb.price;
    }

    newCartOb.type = !newCartOb.category ? "package" : "item";

    toCart(newCartOb);
    console.log("packageDetail", vendorDetail);

    // const Items: any = [];

    // // Iterate over cartItems and populate Items array in bookingDetail
    // cartItem.forEach((item) => {
    //   Items.push({
    //     name: item.name,
    //     qty: item.qty,
    //     price: item.price,
    //   });
    // });

    // setBookingPayload({
    //   personCount: guests,
    //   vendorId: vendorDetail?._id,
    //   bookingDetail: { Items },
    // });
    toastAlert("Package Added to Cart");
  };

  const handleBooking = () => {
    if (businessDetail?.bnType == "Caterer") {
      if (cartItem.length) router.push("/booking/pickdate");
      else swalPopUp("Add items to cart", "Please select any item", "info");
    } else {
      setBookingPayload({
        vendorId: vendorDetail?.ownerinfo,
        bookingDetail: {
          venueFacility: vendorDetail.venueFacility,
          venueCapacity: vendorDetail.venueCapacity,
          actualPrice: vendorDetail.venuePrice,
          unit: vendorDetail.unit,
        },
      });
      router.push("/booking/guests");
    }
  };

  useEffect(() => {
    const Items: any = [];

    // Iterate over cartItems and populate Items array in bookingDetail
    cartItem.forEach((item) => {
      Items.push({
        name: item.name,
        qty: item.qty,
        price: item.price * item.qty,
      });
    });

    setBookingPayload({
      personCount: guests,
      vendorId: vendorDetail?.ownerinfo,
      bookingDetail: { Items, totalPrice: calculateTotalPrice() },
    });
  }, [cartItem]);

  useEffect(() => {
    if (type && vendorId) {
      getBusinessDetails();
    }
  }, [router.query, refreash]);

  // useEffect(() => {
  //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  // }, []);

  console.log("businessDetail", businessDetail);

  return (
    <>
      <Grid container spacing={1} sx={{ padding: 4 }}>
        <Grid item xs={12} sm={8}>
          {/* <img src={"/images/banquet.png"} width={"100%"} height="400px" /> */}
          <VenSlide images={businessDetail?.coverPhotos} />
        </Grid>

        {!isMobile && (
          <Grid item xs={4}>
            <img
              src={businessDetail?.coverPhotos[2]}
              width={"100%"}
              height="200px"
              style={{ borderRadius: "8px" }}
            />
            <img
              src={businessDetail?.coverPhotos[3]}
              width={"100%"}
              height="200px"
              style={{ borderRadius: "8px" }}
            />
          </Grid>
        )}

        {/* <Grid item xs={4} sx={{display:'flex', flexDirection:'column' }}>
          <img src="/images/banquet.png" width={'100%'}  />
          <img src="/images/banquet.png" width={'100%'} style={{marginTop:'5px'}} />
        </Grid> */}

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, marginTop: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#37474f",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {businessDetail?.BussinessName || "N/A"}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <StarIcon sx={{ color: "#ffb413", fontSize: "14px" }} />
                  <Typography
                    sx={{
                      color: "#37474F",
                      fontSize: "12px",
                      ml: 1,
                    }}
                  >
                    {businessDetail?.ratingInfo?.totalRating
                      .toString()
                      ?.slice(0, 3)}
                    ({businessDetail?.ratingInfo?.reviews?.length})
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: "18px", color: "#37474f" }}>
                  <span style={{ fontWeight: "600" }}>Address:</span>{" "}
                  {businessDetail?.Address || "N/A"}
                </Typography>

                <Typography sx={{ fontSize: "18px", color: "#37474f" }}>
                  <span style={{ fontWeight: "600" }}> City: </span>{" "}
                  {businessDetail?.city || "N/A"}
                </Typography>
                <Typography sx={{ fontSize: "18px", color: "#37474f" }}>
                  <span style={{ fontWeight: "600" }}> Service Type: </span>{" "}
                  {businessDetail?.bnType == "Venues"
                    ? "Venue"
                    : businessDetail?.bnType || "N/A"}
                </Typography>
                {queryParams.type == "Venues" && (
                  <Typography sx={{ fontSize: "18px", color: "#37474f" }}>
                    <span style={{ fontWeight: "600" }}> Price: </span>{" "}
                    {`${vendorDetail?.venuePrice} (${vendorDetail?.unit})` ||
                      "N/A"}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="contained"
                  size={"medium"}
                  sx={{
                    borderColor: "#672C70",
                    color: "#fff",
                    background: "#672C70",
                    textTransform: "none",
                    "&:hover": {
                      background: "#520E5C",
                      borderColor: "#520E5C",
                      color: "#fff",
                    },
                  }}
                  onClick={handleBooking}
                  // onClick={handleClick({ vertical: 'top', horizontal: 'right' })}
                >
                  Book Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {queryParams.type == "Venues" && (
          <>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Typography
                  sx={{ fontSize: "18px", fontWeight: "600", color: "#37474f" }}
                >
                  Details
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HomeIcon
                    sx={{ color: "#672C70", fontSize: "1.2rem", mr: 1 }}
                  />
                  <Typography>Venue Type</Typography>
                </Box>
                <Box sx={{ display: "flex", ml: 3 }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#672C70", fontSize: "0.7rem", mr: 1, mt: 1 }}
                  />
                  <Typography>{vendorDetail?.venueType}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DirectionsCarIcon
                    sx={{ color: "#672C70", fontSize: "1.2rem", mr: 1 }}
                  />
                  <Typography>Parking Space</Typography>
                </Box>
                <Box sx={{ display: "flex", ml: 3 }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#672C70", fontSize: "0.7rem", mr: 1, mt: 1 }}
                  />
                  <Typography>
                    {vendorDetail?.venueParkingAvaliable ? "Yes" : "No"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <GroupIcon
                    sx={{ color: "#672C70", fontSize: "1.2rem", mr: 1 }}
                  />
                  <Typography>Staff</Typography>
                </Box>
                <Box sx={{ display: "flex", ml: 3 }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#672C70", fontSize: "0.7rem", mr: 1, mt: 1 }}
                  />
                  <Typography>
                    {" "}
                    {vendorDetail?.venueStaff == "Both"
                      ? "Male & Female"
                      : vendorDetail?.venueStaff}{" "}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon
                    sx={{ color: "#672C70", fontSize: "1.2rem", mr: 1 }}
                  />
                  <Typography>Time Slots</Typography>
                </Box>
                <Box sx={{ display: "flex", ml: 3 }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#672C70", fontSize: "0.7rem", mr: 1, mt: 1 }}
                  />
                  <Typography>
                    {vendorDetail?.venueTimeSlot == "Both"
                      ? "Morning & Evening"
                      : vendorDetail?.venueTimeSlot}{" "}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ReduceCapacityIcon
                    sx={{ color: "#672C70", fontSize: "1.2rem", mr: 1 }}
                  />
                  <Typography>Capacity</Typography>
                </Box>
                <Box sx={{ display: "flex", ml: 3 }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#672C70", fontSize: "0.7rem", mr: 1, mt: 1 }}
                  />
                  <Typography>
                    {`${vendorDetail?.venueCapacity} persons`}
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={6} xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DescriptionIcon
                    sx={{ color: "#672C70", fontSize: "1.2rem", mr: 1 }}
                  />
                  <Typography>Description</Typography>
                </Box>
                <Box sx={{ display: "flex", ml: 3 }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#672C70", fontSize: "0.7rem", mr: 1, mt: 1 }}
                  />
                  <Typography>{vendorDetail?.description}</Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Typography
                sx={{ fontSize: "18px", fontWeight: "600", color: "#37474f" }}
              >
                Facilities
              </Typography>
            </Grid>
            {vendorDetail?.venueFacility?.map((item: any) => (
              <Grid item xs={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#672C70", fontSize: "0.7rem", mr: 1 }}
                  />
                  <Typography sx={{ fontSize: "16px" }}>{item} </Typography>
                </Box>
              </Grid>
            ))}
          </>
        )}

        {(queryParams.type == "Caterer" ||
          queryParams.type == "Photographer") && (
          <>
            {/* vendor packages */}
            <Grid item xs={12}>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Typography
                sx={{ fontSize: "18px", fontWeight: "600", color: "#37474f" }}
              >
                Packages
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {vendorDetail?.package.map((item: any) => (
                  <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <Card
                        sx={{
                          borderRadius: 4,
                          cursor: "pointer",
                          boxShadow:
                            "#863d9157 0px 0px 2px 0px, #5983ad33 0px 12px 24px -4px",
                        }}
                        onClick={() => handlePackage(item)}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",

                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Avatar
                                className="blur"
                                variant="rounded"
                                src={item?.images[0]}
                                // sx={{ width: 30, height: 30 }}
                              />

                              <Typography
                                sx={{
                                  ml: 1,
                                  fontSize: "18px",
                                  fontWeight: "600",
                                  color: "#37474f",
                                }}
                              >
                                <Tooltip
                                  title={item.name || "N/A"}
                                  placement="top"
                                >
                                  {truncateText(item.name, 10) || "N/A"}
                                </Tooltip>
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "14px",

                                color: "#37474f",
                              }}
                            >
                              {`Pkr ${item.price} ${
                                queryParams.type == "Caterer"
                                  ? item.unit
                                  : "Fixed"
                              }` || "N/A"}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "14px", color: "#37474f" }}
                          >
                            <Tooltip
                              title={
                                (item.details && item.details.join(",")) ||
                                "N/A"
                              }
                              placement="top"
                            >
                              {item.details &&
                                truncateText(item.details.join(","), 28)}
                            </Tooltip>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Grid>

            {/* vendor menu */}

            {queryParams.type == "Caterer" && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 1, mb: 2 }} />
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#37474f",
                    }}
                  >
                    Menu
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {vendorDetail?.FoodMenu.map((item: any) => (
                      <>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Card
                            sx={{
                              borderRadius: 4,
                              cursor: "pointer",
                              boxShadow:
                                "#863d9157 0px 0px 2px 0px, #5983ad33 0px 12px 24px -4px",
                            }}
                            // onClick={() => handlePackage(item)}
                          >
                            <CardContent>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                  }}
                                >
                                  <Avatar
                                    className="blur"
                                    variant="rounded"
                                    src={item?.images[0]}
                                    // sx={{ width: 30, height: 30 }}
                                  />

                                  <Typography
                                    sx={{
                                      ml: 1,
                                      fontSize: "18px",
                                      fontWeight: "600",
                                      color: "#37474f",
                                    }}
                                  >
                                    <Tooltip
                                      title={item.name || "N/A"}
                                      placement="top"
                                    >
                                      {truncateText(item.name, 10) || "N/A"}
                                    </Tooltip>
                                  </Typography>
                                </Box>
                                <Typography
                                  sx={{ fontSize: "14px", color: "#37474f" }}
                                >
                                  {`Pkr ${item.price} ${item.unit}` || "N/A"}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  // mb: 1,
                                }}
                              >
                                <Typography
                                  sx={{ fontSize: "14px", color: "#37474f" }}
                                >
                                  Category: {item.category}
                                </Typography>
                                <Button
                                  onClick={() => AddToCart(item)}
                                  size="small"
                                  sx={{
                                    fontWeight: "600",
                                    textTransform: "none",
                                    color: "#37474f",
                                  }}
                                >
                                  Add to Cart
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>

      <Grid container spacing={2} sx={{ padding: 4 }}>
        <Grid item xs={12}>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Typography>
            Reviews (
            {businessDetail && businessDetail.ratingInfo.reviews.length})
          </Typography>
        </Grid>
        {/* <Grid item xs={2} sx={{ ml: 2 }}>
          <Avatar sx={{ bgcolor: "#672C70" }}>N</Avatar>
        </Grid> */}
        <Grid item md={10} xs={12} sx={{ display: "flex" }}>
          <Avatar sx={{ bgcolor: "#672C70" }}>N</Avatar>
          <Card sx={{ width: "100%", ml: 2 }}>
            <CardContent>
              <TextField
                fullWidth
                inputRef={commentRef}
                // size="medium"
                // name="comment"
                title="write a comment.."
                minRows={3}
                multiline={true}
                InputProps={{
                  name: "comment",
                }}
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "Center" }}>
                  {breakPoint && (
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#37474f",
                      }}
                    >
                      Select Rating:
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      ml: 0.4,
                    }}
                  >
                    <RatingStarComponent
                      selectedRating={selectedRating}
                      handleRatingChange={handleRatingChange}
                    />
                  </Box>
                </Box>
                <Button
                  onClick={addReview}
                  sx={{
                    size: breakPoint ? "small" : "medium",
                    textTransform: "none",
                    bgcolor: "#672C70",
                    color: "#fff",
                  }}
                >
                  Post
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ padding: 4 }}>
        {businessDetail && businessDetail.ratingInfo.reviews.length > 0 ? (
          businessDetail.ratingInfo.reviews.map((review: any) => {
            function formatCreatedAt(createdAt: any) {
              const options: any = {
                month: "long",
                day: "numeric",
                year: "numeric",
              };
              const formattedDate = new Date(createdAt).toLocaleDateString(
                "en-US",
                options
              );
              return formattedDate;
            }
            return (
              <Grid item md={10} xs={12}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div style={{ display: "flex" }}>
                        <Box sx={{ mr: 2 }}>
                          <Avatar sx={{ bgcolor: "#672C70" }}>
                            {review.userinfo.name[0].toUpperCase()}
                          </Avatar>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#37474f",
                              }}
                            >
                              {review.userinfo.name}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ fontSize: "14px", color: "#37474f" }}
                          >
                            {formatCreatedAt(review.createdAt)}
                          </Typography>
                          {/* <Typography sx={{ fontSize: "16px", mt: 2 }}>
                        {review.comment}
                      </Typography> */}
                        </Box>
                      </div>
                      <div>{userRating(review)}</div>
                    </Box>
                    <Typography
                      sx={{ fontSize: "16px", mt: 2, color: "#37474f" }}
                    >
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>No Comments</Typography>
          </Grid>
        )}
      </Grid>

      {/* Dialog Box */}

      {queryParams.type !== "Caterer" && (
        <CustomPhotographerDialogBox
          handleClose={handleDialog}
          open={packageDialog}
          Data={packageDetail}
          buttonDesign={() => (
            <Grid item xs={12}>
              <Button
                onClick={() => AddToCart(packageDetail)}
                size="large"
                sx={{
                  background: "#672C70",
                  textTransform: "none",
                  borderRadius: 10,
                  color: "#fff",
                  width: "100%",
                  "&:hover": {
                    background: "#520E5C",
                  },
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Select Package
              </Button>
            </Grid>
          )}
          // handleEdit={handleEdit}
          // handleDelete={handleDelete}
        />
      )}

      {queryParams.type === "Caterer" && (
        <CustomDialogBox
          handleClose={handleDialog}
          open={packageDialog}
          title={"Select Package"}
          content={
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      aria-label="open drawer"
                      onClick={DecrementGuests}
                      edge="start"
                      sx={{
                        mr: 1,
                        color: "#672C70",
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <CustomInputUnControlled
                      size="medium"
                      name="noOfGuests"
                      title="No of Guests"
                      value={guests}
                      type="number"
                      showAdornment={false}
                      handleAdvanceChange={(e: any) =>
                        setGuests(e.target.value)
                      }
                    />

                    <IconButton
                      aria-label="open drawer"
                      onClick={IncrementGuests}
                      edge="start"
                      sx={{
                        ml: 1,
                        color: "#672C70",
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#672C70",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Menu
                  </Typography>
                  {packageDetail?.details.map((item: any) => (
                    <Chip
                      sx={{ color: "#37474f", m: "5px 5px 5px 0px" }}
                      label={item}
                      variant="outlined"
                    />
                  ))}
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#672C70",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Description
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#37474f",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {packageDetail?.description}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#672C70",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      PKR {packageDetail?.price * guests}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#672C70",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {packageDetail?.price} Per head
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    onClick={() => AddToCart(packageDetail)}
                    size="large"
                    sx={{
                      background: "#672C70",
                      textTransform: "none",
                      borderRadius: 10,
                      color: "#fff",
                      width: "100%",
                      "&:hover": {
                        background: "#520E5C",
                      },
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Select Package
                  </Button>
                </Grid>
              </Grid>

              <ToastContainer />
            </>
          }
        />
      )}
    </>
  );
};

export default VendorProfile;
