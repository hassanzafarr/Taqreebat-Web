import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";

interface TimePickerProps {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  errors?: any;
}
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
const CustomTimePicker = ({
  control,
  name = "",
  label = "",
  required = false,
  disabled = false,
  errors,
}: TimePickerProps) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                readOnly={disabled}
                sx={textFieldDesign}
                label={label}
                value={dayjs(value) || null}
                onChange={onChange}
                slotProps={{ textField: { size: "small" } }}
                renderInput={(params: any) => (
                  <TextField onBlur={onBlur} size="small" {...params} />
                )}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </LocalizationProvider>
          );
        }}
      />
      {errors?.[name] && errors[name].type === "required" ? (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors[name].message}
        </FormHelperText>
      ) : errors?.[name] ? (
        <FormHelperText
          sx={{ color: "error.main" }}
        >{`${label} cannot be empty`}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CustomTimePicker;
