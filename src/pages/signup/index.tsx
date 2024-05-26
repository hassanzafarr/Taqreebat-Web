import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  TypographyProps,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormContext } from "react-hook-form";
// import loginAnimation from "../../../src/lottie/animation_lko6di0g.json";
// import Lottie from "react-lottie";
import { Google } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Endpoints from "@/helper/endpoints";
import { swalPopUp } from "@/helper/helper";
import payloads from "@/helper/payloads";
import axios from "axios";

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem",
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const textFieldDesign = {
  "& label.Mui-focused": {
    color: "#672C70",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#4c4e6499",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#672C70",
    },
  },
};

const SignUp = () => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const router: any = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(3).required("Password is required"),
    username: yup.string().min(3).required("Username is required"),
    contact: yup.string().min(11).required("Contact No is required"),
  });

  const defaultValues = {
    password: "",
    email: "",
    contact: "",
    username: "",
  };

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

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        Endpoints.signup,
        payloads.signupPayload(
          data.username,
          data.email,
          data.password,
          data.contact
        )
      );
      const { message } = response.data;
      console.log(message);
      swalPopUp("Registered", message, "success", () => {
        router.back();
      });
    } catch (error: any) {
      console.log("error ", error);
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
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          className="content-left"
          sx={{ flex: 1, display: "flex", position: "relative" }}
        >
          {!hidden && (
            <LoginIllustration
              alt="login-illustration"
              src="../../../images/log.jpg"
              style={{ display: "block", minWidth: "100%", height: "100vh" }}
            />
          )}
        </Box>
        {/* <Box className='content-right'>
    {!hidden ? (
      <Box sx={{ flex: 1, display: 'flex', position: 'relative' }}>
        <LoginIllustration
          alt='login-illustration'
                  src="../../../images/log.jpg"
          // src={`/images/misc/man-boxes2.jpg`}
          style={{ display: 'block', minWidth: '100%' }}
        />
      </Box>
    ) : null} */}
        <RightWrapper>
          <Box
            sx={{
              p: 3,
              // mt:7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              backgroundColor: "background.paper",
            }}
          >
            <BoxWrapper>
              <Box sx={{ mb: 3 }}>
                <Typography
                  // variant="h5"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    color: "#4c4e64de",
                    fontWeight: "bold",
                    fontSize: "1.1244rem",
                  }}
                >
                  Welcome to{" "}
                  <span style={{ color: "#672C70" }}> Taqreebat</span>
                </Typography>
                <Typography
                  sx={{ color: "#4c4e6499", fontSize: "0.75rem" }}
                  variant="body2"
                >
                  Please sign-un to your account{" "}
                </Typography>
              </Box>
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label="Name"
                        type={"string"}
                        value={value}
                        sx={textFieldDesign}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.username)}
                        placeholder="03152298374"
                      />
                    )}
                  />
                  {errors.username && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.username.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label="email"
                        value={value}
                        sx={textFieldDesign}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder="abc@gmail.com"
                      />
                    )}
                  />
                  {errors.email && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name="contact"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label="Contact"
                        type={"number"}
                        value={value}
                        sx={textFieldDesign}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.contact)}
                        placeholder="03152298374"
                      />
                    )}
                  />
                  {errors.contact && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.contact.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={value}
                        sx={textFieldDesign}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.password)}
                        placeholder="Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityIcon width={20} />
                                ) : (
                                  <VisibilityOffIcon width={20} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    mb: 4,
                    borderRadius: "8px",
                    background: "#672C70",
                    boxShadow: "rgba(76, 78, 100, 0.42) 0px 4px 8px -4px;",
                    // textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.803571rem",
                    backgroundColor: "#672C70",
                    "&:hover": {
                      background: "#520E5C",
                    },
                  }}
                >
                  SignUp
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ mr: 2, color: "text.secondary" }}>
                    Already have an account?
                  </Typography>
                  <Typography
                    href="/login"
                    component={Link}
                    sx={{ color: "#672C70", textDecoration: "none" }}
                  >
                    Login
                  </Typography>
                </Box>
              </form>
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    </>
  );
};

export default SignUp;
