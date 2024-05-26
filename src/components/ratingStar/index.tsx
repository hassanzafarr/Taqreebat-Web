import React, { useState } from "react";
import { IconButton } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const RatingStarComponent = ({ selectedRating, handleRatingChange }: any) => {
  const array = [1, 2, 3, 4, 5];

  return (
    <>
      {/* <IconButton>
        <StarIcon sx={{ color: "#ffb413", fontSize: "14px" }} />
      </IconButton> */}

      {array.map((val, ind) => (
        <IconButton sx={{padding:'1px'}} onClick={() => handleRatingChange(val)}>
          {val <= selectedRating ? (
            <StarIcon sx={{ color: "#ffb413", fontSize: "20px" }} />
          ) : (
            <StarBorderOutlinedIcon
              sx={{ color: "#ffb413", fontSize: "20px" }}
            />
          )}
        </IconButton>
      ))}
    </>
  );
};

export default RatingStarComponent;
