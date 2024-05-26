import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Navbar.module.css";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  MenuProps,
  styled,
  MenuList,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { showSwipeableDrawerAtom } from "@/helper/middlewareStates";
import { useRecoilState } from "recoil";
import CartDrawer from "../cartDrawer";
import Endpoints from "@/helper/endpoints";
import { swalPopUp } from "@/helper/helper";
import axios from "axios";
import { MdFoodBank } from "react-icons/md";
import { FcAbout, FcCamera, FcStackOfPhotos } from "react-icons/fc";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon
import { RotateRight } from "@mui/icons-material";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: "#672C70",
        color: "#fff",
      },
    },
  },
}));

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [cartDrawerState, setCartDrawerState] = useRecoilState(
    showSwipeableDrawerAtom
  );
  const [isLogin, setisLogin] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    checkIfLogin();
    setToggleMenu(false);
  }, [router.pathname]);

  const navigateToLogin = () => {
    router.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("Bearer");
    setisLogin(false);
    router.push("/");
  };

  const checkTokenExpiry = async () => {
    try {
      const result = await axios.get(Endpoints.getUserData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      });
      const { content } = result.data;
      setUserData(content);
      setisLogin(true);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        // swalPopUp(
        //   "session timed out",
        //   "your session has been timeout ",
        //   "warning"
        // );
        localStorage.removeItem("Bearer");
      } else {
        swalPopUp("Error", error, "error");
      }
    }
  };

  const checkIfLogin = () => {
    const token = localStorage.getItem("Bearer");
    if (token !== null) {
      checkTokenExpiry();
    }
  };

  const handleRoute = (route: any) => {
    handleClose();
    router.push(route);
  };

  console.log("userData", userData);
  return (
    <>
      <CartDrawer />
      <div className={styles.immi__navbar}>
        <div className={styles.immi__navbar_links}>
          <div className={styles.immi__navbar_links_logo}>
            <Link href="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>
          <div className={styles.immi__navbar_links_container}>
            <p>
              <Link href="/">Home</Link>
            </p>
            <p>
              <Link href="/mybookings">My Bookings</Link>
            </p>
            <div className={styles.dropdown}>
              <p>
                Services <BiChevronDown />
                <div
                  className={`${styles.dropdown_content} ${
                    toggleMenu ? styles.dropdown_content_show : ""
                  }`}
                >
                  <Link href="vendorPackages?type=Caterer" className="ser2">
                    <MdFoodBank color="#ba5202" width="100px" />
                    Caterer
                  </Link>
                  <Link href="vendorPackages?type=Venues" className="ser2">
                    <FcStackOfPhotos />
                    Venue
                  </Link>
                  <Link
                    href="vendorPackages?type=Photographer"
                    className="ser2"
                  >
                    <FcCamera />
                    Photographer
                  </Link>
                </div>
              </p>
            </div>
          </div>
        </div>

        <div>
          <IconButton onClick={() => setCartDrawerState(true)}>
            <AddShoppingCartOutlinedIcon />
          </IconButton>
        </div>

        <div className={styles.immi__navbar_sign}>
          {isLogin ? (
            <div className={styles.dropdown}>
              <Avatar
                sx={{ width: 40, height: 40, cursor: "pointer" }}
                onClick={handleClick}
                src="../../../images/man_4140048.png"
              >
                {userData.name[0].toUpperCase()}
              </Avatar>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuList sx={{ border: "hidden" }}>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Box>
                      <Avatar
                        className="blur"
                        variant="rounded"
                        src={"../../../images/man_4140048.png"}
                        sx={{ width: 30, height: 30 }}
                      />
                    </Box>
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        sx={{
                          color: "#37474F",
                          fontSize: "14px",

                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {userData?.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem
                    // onClick={() => handleRoute("/profile")}
                    disableRipple
                  >
                    <AccountCircleIcon /> {/* Profile icon */}
                    <Typography
                    onClick={() => router.push("/profile")}
                      sx={{
                        color: "#37474F",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleRoute("/login")} disableRipple>
                    <LogoutIcon /> {/* Logout icon */}
                    <Typography
                      sx={{
                        color: "#37474F",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </MenuList>
              </StyledMenu>
            </div>
          ) : (
            <Button
              onClick={navigateToLogin}
              size="small"
              sx={{
                my: 2,
                display: "block",
                textTransform: "none",
                color: "#252525",
                border: 1,
                paddingLeft: 1,
                paddingRight: 1,
                borderColor: "#252525",
                fontFamily: `var(--font-poppins)`,
              }}
            >
              {"SignIn"}
            </Button>
          )}
        </div>

        <div className={styles.immi__navbar_menu}>
          {toggleMenu ? (
            <RiCloseLine
              color="#000000"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#000000"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div
              className={`${styles.immi__navbar_menu_container} scale-up-center`}
            >
              <div className={styles.immi__navbar_menu_container_links}>
                <p>
                  <Link href="/">Home</Link>
                </p>
                <p>
                  <Link href="/mybookings">My Bookings</Link>
                </p>
                <div className={styles.dropdown}>
                  <p>
                    Services <BiChevronDown />
                    <div
                      className={`${styles.dropdown_content} ${
                        toggleMenu ? styles.dropdown_content_show : ""
                      }`}
                    >
                      <Link href="vendorPackages?type=Caterer" className="ser2">
                        <MdFoodBank color="#ba5202" />
                        Caterer
                      </Link>
                      <Link href="vendorPackages?type=Venues" className="ser2">
                        <FcStackOfPhotos />
                        Venue
                      </Link>
                      <Link
                        href="vendorPackages?type=Photographer"
                        className="ser2"
                      >
                        <FcCamera />
                        Photographer
                      </Link>
                    </div>
                  </p>
                </div>
              </div>

              {/* <div>
                <IconButton onClick={() => setCartDrawerState(true)}>
                  <AddShoppingCartOutlinedIcon />
                </IconButton>
              </div> */}

              {isLogin ? (
                <div className={styles.dropdown}></div>
              ) : (
                <Button
                  onClick={navigateToLogin}
                  size="small"
                  sx={{
                    my: 2,
                    display: "block",
                    textTransform: "none",
                    color: "#252525",
                    border: 1,
                    paddingLeft: 1,
                    paddingRight: 1,
                    borderColor: "#252525",
                  }}
                >
                  {"SignIn"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
