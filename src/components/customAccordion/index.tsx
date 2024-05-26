// ** MUI Imports
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CircleIcon from "@mui/icons-material/Circle";

// ** Icons Imports
// import ChevronDown from 'mdi-material-ui/ChevronDown'

const CustomAccordion = ({
  data,
  handleChange,
  expanded,
  arrowIcon,
  title,
}: {
  data: any;
  handleChange: any;
  expanded: any;
  arrowIcon: any;
  title: any;
}) => {
  // ** State
  
  return (
    <>
      <Accordion expanded={title == expanded}>
        <AccordionSummary onClick={handleChange} expandIcon={arrowIcon}>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "14px", color: "#4c4e64de" }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            {data.map((item: any, index: any) => (
              <div
                key={index}
                style={{ display: "flex" }}
              >
                <CircleIcon style={{ fontSize: "8px", marginTop:'5px', marginRight: "5px" }} />
                <Typography>{item}</Typography>
              </div>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
