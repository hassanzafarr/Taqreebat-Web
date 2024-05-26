import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import CustomInput from "@/components/customInput";
import axios from "axios";
import Endpoints from "@/helper/endpoints";
import { Email } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import CustomDialogBox from "@/components/customDialogBox";
import { askConfirmationPopUp, swalPopUp } from "@/helper/helper";
import CustomInputUnControlled from "@/components/customInputUncontrolled";
import CustomLoader from "@/components/customLoader";

const Profile = () => {
  // const [userData, setUserData] = useState();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const router: any = useRouter();

  const handleEdit = (route: String) => {
    router.push({
      pathname: `/${route}`,
    });
    // router.push('/createFoodMenu')
  };

  const initialValues: any = {
    oldPassword: "",
    password: "",
  };

  const validationSchema: any = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    password: Yup.string().required("New Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: initialValues,
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const getUserData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(Endpoints.getUserData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      });
      const { content } = result.data;
      setUserData(content);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 401) {
        swalPopUp("Error", "Something went Wrong", "error");
        // localStorage.removeItem("Bearer");
      } else {
        swalPopUp("Error", error, "error");
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogState(false);
  };

  const openDialog = () => {
    setDialogState(true);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <CustomLoader loading={loading} />
      {/* <Dialog open={dialogState} onClose={handleCloseDialog}></Dialog> */}
      <CustomDialogBox
        handleClose={handleCloseDialog}
        open={dialogState}
        title={"Change Password"}
        content={
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomInputUnControlled
                  size="small"
                  name="oldPassword"
                  title="Old Password"
                  value={oldPassword}
                  type="password"
                  handleAdvanceChange={(e: any) =>
                    setOldPassword(e.target.value)
                  }
                />

                {/* <CustomInput
                    control={control}
                    minRows={1}
                    name={"oldPassword"}
                    label={"Old Password"}
                    type="password"
                    errors={errors}
                  /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputUnControlled
                  size="small"
                  name="password"
                  title="New Password"
                  value={newPassword}
                  type="password"
                  handleAdvanceChange={(e: any) =>
                    setNewPassword(e.target.value)
                  }
                />
                {/* <CustomInput
                    control={control}
                    minRows={1}
                    name={"password"}
                    label={"New Password"}
                    type="password"
                    errors={errors}
                  /> */}
              </Grid>
            </Grid>
          </>
        }
        actions={
          <>
            <Button
              variant="outlined"
              size={"medium"}
              sx={{
                borderColor: "#672C70",
                color: "#672C70",
                // width: "100%",
                textTransform: "none",
                "&:hover": {
                  background: "#672C70",
                  borderColor: "#672C70",
                  color: "#fff",
                },
              }}
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              size={"medium"}
              sx={{
                backgroundColor: "#672C70",
                color: "#fff",
                // width: "100%",
                textTransform: "none",
                "&:hover": {
                  background: "#520E5C",
                  borderColor: "#520E5C",
                  color: "#fff",
                },
              }}
              type="submit"
              // onClick={() => handleAddPayment(rowID)}
              // onClick={handleChangePassword}
              variant="contained"
            >
              Save
            </Button>
          </>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, margin: 5 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between", // Align items at the start and end
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Avatar
                      className="blur"
                      variant="rounded"
                      src={"../../../images/man_4140048.png"}
                      sx={{ width: 100, height: 100 }}
                    />
                  </Box>
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    {" "}
                    {/* Set flexGrow to 1 to allow the box to grow */}
                    <Typography
                      sx={{ color: "#37474F", fontWeight: 500, fontSize: 16 }}
                    >
                      {userData?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      onClick={openDialog}
                      variant="contained"
                      size="small"
                      sx={{
                        "&:hover": { background: "#672C70" },
                        background: "#520E5C",
                        textTransform: "none",
                      }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ mt: 2 }} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={{ color: "#37474F", fontSize: "20px" }}>
                    Personal Information
                  </Typography>
                  {/* <IconButton
                      sx={{ color: "#37474F" }}
                      onClick={() => handleEdit("/personalDetails")}
                    >
                      <EditIcon style={{ fontSize: "1rem" }} />
                    </IconButton> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonOutlineOutlinedIcon sx={{ color: "#4c4e64de" }} />
                    <div style={{ marginLeft: "15px" }}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#37474F",
                        }}
                      >
                        Full Name
                      </Typography>
                      <Typography sx={{ color: "#4c4e64de", fontSize: "15px" }}>
                        {userData?.name}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EmailOutlinedIcon sx={{ color: "#4c4e64de" }} />
                    <div style={{ marginLeft: "15px" }}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#37474F",
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#4c4e64de", fontSize: "15px" }}
                      >
                        {userData?.email}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocalPhoneOutlinedIcon sx={{ color: "#4c4e64de" }} />
                    <div style={{ marginLeft: "15px" }}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#37474F",
                        }}
                      >
                        Phone No
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#4c4e64de", fontSize: "15px" }}
                      >
                        {userData?.phoneNo}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LockOpenOutlinedIcon sx={{ color: "#4c4e64de" }} />
                    <div style={{ marginLeft: "15px" }}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#37474F",
                        }}
                      >
                        Password
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#4c4e64de", fontSize: "15px" }}
                      >
                        **********
                      </Typography>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
