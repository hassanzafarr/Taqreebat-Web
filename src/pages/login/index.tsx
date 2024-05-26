import { useState, useEffect } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography, { TypographyProps } from "@mui/material/Typography";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid } from "@mui/material";
import img from "../../../public/images/man-boxes2.jpg";
import { useRouter } from "next/router";
// import { askConfirmationPopUp, swalPopUp } from "@/helper/helper";
// import { userLogin } from "@/helper/authenticationFunction";
import { useSetRecoilState, RecoilRoot, useRecoilState } from "recoil";
import Endpoints from "@/helper/endpoints";
import axios from "axios";
import payloads from "@/helper/payloads";
import { swalPopUp } from "@/helper/helper";
// import { userInfo } from "@/helper/middlewareStates";
// import CustomInput from "@/components/customInput";
// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "100rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "68rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "70rem",
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 500,
  },
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

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

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().min(3).required("Password is a required field"),
});

const defaultValues = {
  password: "",
  email: "",
};

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const theme = useTheme();
  const router = useRouter();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  //   const [userState, setUserState] = useRecoilState(userInfo);
  // ** Vars
  // const { skin } = settings

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

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        Endpoints.login,
        payloads.loginPayload(data.email, data.password)
      );
      const { token } = response.data;

      localStorage.setItem("Bearer", token);
      router.push("/");
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

  function handleForgotPassword(): void {
    throw new Error("Function not implemented.");
  }

  //   const handleForgotPassword = async () => {
  //     const confirmation = await askConfirmationPopUp(
  //       "Forgot Password?",
  //       "Are you sure you want to reset your password?",
  //       "info",
  //       "Yes"
  //     );
  //     console.log("result", confirmation);

  //     if (confirmation.isConfirmed) {
  //       router.push('/forgotPassword')
  //     }
  //   }

  //   useEffect(() => {
  //     localStorage.setItem("Bearer", "");
  //     setUserState("");
  //     localStorage.setItem("businessType", "");
  //   }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        className="content-left"
        sx={{
          flex: 1,
          display: "flex",
          position: "relative",
          backgroundColor: "#EEEEEE",
        }}
      >
        {!hidden && (
          <LoginIllustration
            alt="login-illustration"
            src="../../../images/rightimage.svg"
            // style={{ display: "block", minWidth: "100%", height: "100vh" }}
            style={{
              display: "block",
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
            }}
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
                <span style={{ marginRight: "0.2em" }}>Welcome to</span>
                <span style={{ color: "#672C70" }}>Taqreebat</span>
              </Typography>
              <Typography
                sx={{ color: "#4c4e6499", fontSize: "0.75rem" }}
                variant="body2"
              >
                Please sign-in to your account{" "}
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
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

              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  label="Remember Me"
                  control={
                    <Checkbox
                      sx={{
                        color: "#672C70",
                        "&.Mui-checked": {
                          color: "#672C70", // Change the color when checked
                        },
                      }}
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                />
                <Button
                  size="small"
                  onClick={() => handleForgotPassword()}
                  variant="text"
                  sx={{
                    textTransform: "none",
                    color: "#672C70",
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>
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
                Login
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
                  New on our platform?
                </Typography>
                <Typography
                  href="/signup"
                  component={Link}
                  sx={{ color: "#672C70", textDecoration: "none" }}
                >
                  Create an account
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};

export default Login;
