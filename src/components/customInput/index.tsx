import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
  } from "@mui/material";
  import { Controller } from "react-hook-form";
  // import { Plus } from 'mdi-material-ui'
  
  interface InputFieldProps {
    control: any;
    name: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: any;
    onEndAdornmentClick?: any;
    showAdornment?: boolean;
    placeholder?: string;
    type?: string;
    title?: any;
    multiline?: boolean;
    minRows?: any;
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
  
  const CustomInput = ({
    control,
    name = "",
    label = "",
    title,
    placeholder,
    required,
    disabled,
    errors = {},
    minRows,
    multiline,
    type,
  }: InputFieldProps) => {
    return (
      <FormControl style={{ width: "100%" }}>
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoComplete="off"
              size="small"
              sx={textFieldDesign}
              disabled={disabled}
              label={label || title}
              multiline={multiline}
              minRows={minRows}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              type={type}
              InputLabelProps={{ shrink: !!value }}
              placeholder={placeholder}
            />
          )}
        />
        {errors?.[name] && (
          <FormHelperText sx={{ color: "error.main" }}>
            {errors?.[name].message}
          </FormHelperText>
        )}
      </FormControl>
    );
  };
  export default CustomInput;
  