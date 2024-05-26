import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface DatePickerProps {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
  errors?: any;
  views?: any;
  min?: undefined | Date;
  dateFormat?: string | undefined;
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
const CustomDatePicker = ({
  control,
  name = "",
  label = "",
  required = false,
  disableFuture = false,
  disablePast = false,
  disabled = false,
  errors,
  min = undefined,
  views = ["year", "month", "day"],
  dateFormat = "dd/MM/yyyy",
}: DatePickerProps) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                readOnly={disabled}
                openTo="day"
                sx={textFieldDesign}
                inputFormat={dateFormat}
                disablePast={disablePast}
                disableFuture={disableFuture}
                label={label}
                minDate={min}
                value={dayjs(value) || null}
                views={views}
                onChange={onChange}
                slotProps={{ textField: { size: "small" } }}
                renderInput={(params: any) => (
                  <TextField onBlur={onBlur} size="small" {...params} />
                )}
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
export default CustomDatePicker;
