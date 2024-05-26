import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const textFieldDesign = {
  "& label": {
    color: "#4c4e64de",
  },

  "& label.Mui-focused": {
    color: "#4c4e64de", // Change the label color on focus to #4e4e54
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#4c4e64de",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4c4e64de",
    },
    "& fieldset": {
      borderColor: "#4c4e64de", // Change the default border color to #4e4e54
    },
    "& input": {
      color: "#4c4e64de",
      fontFamily: "Poppins, sans-serif",
    },
  },
};

const textFieldStyles = {
  borderRadius: "7px",
  background: "#EBECF0",
  //  padding:1,
  // for inside box shadow
  // boxShadow: '1px 3px 3px 0px rgba(0, 0, 0, 0.28) inset, -1px -2px 2px 0px rgba(255, 255, 255, 0.92) inset',

  // for outside box shadow
  // boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.30), -4px -4px 8px 0px rgba(255, 255, 255, 0.80)',
  boxShadow: "#863d9157 0px 0px 2px 0px, #5983ad33 0px 12px 24px -4px",

  border: "none",

  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "& fieldset": {
      border: "none", // Change the default border color to #4e4e54
    },
    "& input": {
      color: "#4c4e64de", // Change the input text color to white
      fontFamily: "Poppins, sans-serif",
    },
  },
};

const ariaLabel = { "aria-label": "description" };

const CustomInputUnControlled = ({
  //   value,
  //   data = [],
  name = "",
  handleAdvanceChange,
  showAdornment,
  onEndAdornmentClick = () => console.log("Click adorment"),
  title = "",
  size = "small",
  type,
  value,
  multiline,
  minRows,
  disabled = false,
  neumorphism = false,
  icon = null,
  inputref,
}: {
  name?: string;
  title: string;
  icon?: any;
  type: any;
  inputref?: any;
  handleAdvanceChange?: any;
  onEndAdornmentClick?: any;
  neumorphism?: boolean;
  showAdornment?: boolean;
  size?: any;
  multiline?: any;
  minRows?: any;
  value?: any;
  disabled?: boolean;
}) => {
  return (
    <>
      <FormControl fullWidth>
        <TextField
          inputRef={inputref}
          disabled={disabled}
          name={name}
          autoComplete="off"
          type={type}
          sx={neumorphism ? textFieldStyles : textFieldDesign}
          size={size}
          label={!neumorphism && title}
          placeholder={neumorphism ? title : ""}
          multiline={multiline}
          minRows={minRows}
          value={value}
          variant="outlined"
          inputProps={ariaLabel}
          // sx={{ mt: 2 }}
          //   InputProps={{
          //     readOnly: disabled ? disabled : false
          //   }}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => handleAdvanceChange(e)}
          InputProps={{
            readOnly: disabled ? disabled : false,
            endAdornment: showAdornment ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="click end adorment button"
                  onClick={onEndAdornmentClick}
                  edge="end"
                >
                  {icon}
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </FormControl>
    </>
  );
};
export default CustomInputUnControlled;
