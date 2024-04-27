import React from "react";
import { useState, useEffect } from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const StarRating = ({ currentRating, maxRating = 5, onRating }) => {
  // Create a handleRating function inside the component if needed

  const [currentValue, setCurrentValue] = useState(currentRating);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleRating = (value) => {
    //Todo: handing adding rating
  };

  const handleClick = (value) => {
    setCurrentValue(currentRating);
    handleRating(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="star-rating">
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        // Determine which icon to display
        const fillCondition = hoverValue
          ? hoverValue >= ratingValue
          : currentValue >= ratingValue;
        return (
          <span
            key={index}
            onClick={() => handleClick(ratingValue)}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: "pointer" }} // Add cursor style for better UX
          >
            {fillCondition ? (
              <StarRateIcon style={{ color: "red" }} />
            ) : currentValue >= ratingValue - 0.5 ? (
              <StarHalfIcon style={{ color: "red" }} />
            ) : (
              <StarOutlineIcon style={{ color: "red" }} />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
