import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Theme,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";

import { useForm } from "react-hook-form";

const CustomDialogBox = ({
  handleClose,
  open,
  handleEdit,
  handleDelete,
  foodItem,
  title,
  actions,
  content,
}: any) => {
  const initialValues: any = {
    category: "",
    name: "",
    price: "",
    unit: "",
    description: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const scrollbarStyles = (theme: Theme) => ({
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: "auto",
    scrollbarWidth: "thin", // For Firefox
    scrollbarColor: "#888 transparent", // For Firefox
    "&::-webkit-scrollbar": {
      width: "6px",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", pr: 2 }}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "600" }}
          >
            {title}
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider></Divider>
        <DialogContent sx={scrollbarStyles}>{content}</DialogContent>

        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialogBox;
