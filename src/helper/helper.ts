import axios from "axios";
import { format } from "date-fns";
import Swal, { SweetAlertIcon } from "sweetalert2";
import Endpoints from "./endpoints";
import { createTheme } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const makeHeadings = (data: any) => {
  const myRoute = data.asPath;
  let Heading = myRoute.replace("/", "");
  Heading = Heading.replace(/([a-z])([A-Z])/g, "$1 $2");
  Heading = Heading.replace(Heading.charAt(0), Heading.charAt(0).toUpperCase());

  return Heading.includes("?")
    ? Heading.split("?")[0] + " (Editing mode)"
    : Heading;
};

export const truncateText = (data: any, limit: any) => {
  let text = data;
  if (text) {
    text = text.toString();
    text = text.trim();
    if (text.length > limit) text = text.substring(0, limit) + "...";
  }

  return text;
};

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export const swalPopUp = (
  title: any,
  msg: any,
  msgIcon: any,
  doThen: (() => void) | null = null
) => {
  Swal.fire({
    text: msg,
    title: title,
    icon: msgIcon,
    showConfirmButton: true,
    showCancelButton: false,
  }).then((result) => {
    if (doThen !== null) {
      doThen();
    }
  });
};

export const askConfirmationPopUp = async (
  title: any,
  msg: any,
  msgIcon: any,
  confirmBtnTxt: any
) => {
  const result = await Swal.fire({
    title: title,
    text: msg,
    icon: msgIcon,
    showCancelButton: true,
    confirmButtonColor: "#672C70",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmBtnTxt,
  });
  return result;
};

export const toastAlert = (text: any) => {
  toast.success("Success Notification !", {
    position: "top-center",
  });
};

// export const uploadFileToCloudnariy = async (selectedFile: any) => {
//   const formData = new FormData();
//   formData.append("file", selectedFile);
//   formData.append("upload_preset", "up8pqlbt");
//   try {
//     const response = await fetch(
//       "https://api.cloudinary.com/v1_1/dmh0zhte9/upload",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );
//     console.log(response);
//     if (response.ok) {
//       const res = await response.json();
//       // swalPopUp("uploaded", res.url, "success");
//       console.log("Image uploaded successfully.", res);
//       return res.url;
//     } else {
//       console.error("Image upload failed. ", JSON.stringify(response));
//       return;
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return;
//   }
// };

export const handleSessionOut = (error: any) => {
  swalPopUp("Session Expired", "Please log in again", "error");
  location.replace("/login");
};

// export const checkTokenExpiry = async () => {
//   try {
//     const result = await axios.get(Endpoints.getUserData, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("Bearer"),
//       },
//     });
//   } catch (error) {
//     if (error?.response?.status === 401) {
//       handleSessionOut(error);
//     } else {
//       swalPopUp("Error", error, "error");
//     }
//   }
// };

export const formatDate = (currDate: any): string => {
  if (currDate) {
    const newDate = new Date(currDate);

    return format(newDate, "yyyy/MM/dd").toString().replaceAll("/", "-");
  } else return "";
};

export const formatTime = (currDate: string): string => {
  if (currDate) {
    const newDate = new Date(currDate);
    if (currDate.includes(":")) return format(newDate, "HH:mm");
    else return "00:00";
  } else return "00:00";
};
