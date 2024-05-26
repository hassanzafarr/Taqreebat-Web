import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Theme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//   import CustomSlider from "../customSlider";
import CustomInput from "../customInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useForm } from "react-hook-form";
import CustomAccordion from "../customAccordion";

const CustomPhotographerDialogBox = ({
  handleClose,
  open,
  handleEdit,
  handleDelete,
  buttonDesign,
  Data,
}: any) => {
  const initialValues: any = {
    category: "",
    name: "",
    price: "",
    noOfPhotos: "",
    description: "",
  };

  const [expanded, setExpanded] = useState<string>("");
  const [accordionStates, setAccordionStates] = useState<any>({
    deliverables: false,
    photography: false,
    videography: false,
  });

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

  const handleChangeAccordion = (title: any) => {
    // setAccordionStates((prev: any) => ({
    //   ...prev,
    //   [accordionName]: !prev[accordionName],
    // }));
    setExpanded((prev) => {
      console.log("prev", prev);
      return prev == title ? "" : title;
    });
    // setExpanded((prev: any) => {(prev == title ? "" : title)});
    console.log("Accordion States:", title);
  };

  useEffect(() => {
    if (Data) {
      Object?.keys(Data).map((key) => {
        setValue(key, Data[key]);
        console.log("data", Data);
      });
    }
  }, [Data]);

  console.log("data", Data);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Details"}</DialogTitle>
        <Divider></Divider>
        <DialogContent sx={scrollbarStyles}>
          {/* <Grid container spacing={0}>
              <Grid item xs={12} sx={{ mb: 4 }}>
                <CustomSlider
                  borderRadius={"14px"}
                  images={Data?.images}
                  hasButtons={true}
                />
              </Grid>
            </Grid> */}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomInput
                control={control}
                name={"name"}
                label={"Item Name"}
                disabled={true}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInput
                control={control}
                name={"price"}
                label={"Price"}
                disabled={true}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInput
                control={control}
                name={"noOfPhotos"}
                label={"No Of Photos"}
                disabled={true}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomAccordion
                data={Data?.deliverables}
                title={"Deliverables"}
                handleChange={() => handleChangeAccordion("Deliverables")}
                expanded={expanded}
                arrowIcon={<KeyboardArrowDownIcon />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomAccordion
                data={Data?.videography}
                title={"Videography"}
                handleChange={() => handleChangeAccordion("Videography")}
                expanded={expanded}
                arrowIcon={<KeyboardArrowDownIcon />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomAccordion
                data={Data?.photography}
                title={"Photography"}
                handleChange={() => handleChangeAccordion("Photography")}
                expanded={expanded}
                arrowIcon={<KeyboardArrowDownIcon />}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                control={control}
                multiline={true}
                minRows={4}
                name={"description"}
                label={"Description"}
                disabled={true}
              />
            </Grid>
            {buttonDesign()}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomPhotographerDialogBox;
