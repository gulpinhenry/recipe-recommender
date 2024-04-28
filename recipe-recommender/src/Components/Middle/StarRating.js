import React from "react";
import { useState, useEffect } from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const StarRating = ({ currentRating, maxRating = 5, post }) => {
  // Create a handleRating function inside the component if needed
  const [currentValue, setCurrentValue] = useState(currentRating);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const updateRatingDisplay = async (postId) => {
    try {
      const response = await fetch(`/api/rating/post/${postId}`);
      const data = await response.json();
      if (response.ok) {
        // Update your state or DOM with the new average
        // setCurrentValue(data.average); // Adjust this to match how your state management is done
        let average = 0;
        let ratings = data.data;
        if (ratings.length === 0) return 0; // Return 0 to avoid division by zero if the array is empty

        const totalScore = ratings.reduce((acc, curr) => {
          return acc + curr.score;
        }, 0);

        average = totalScore / ratings.length;
        return average
      } else {
        console.error("Failed to fetch updated rating average:", data.message);
      }
    } catch (error) {
      console.error("Error fetching rating average:", error);
    }
  };

  const handleRating = async (
    username,
    recipename,
    post_id,
    score,
    comment
  ) => {
    // Check if the score is within the valid range
    if (score < 1 || score > 5 || !Number.isInteger(score)) {
      console.error("Score must be an integer between 1 and 5.");
      return;
    }

    // Prepare the data to be sent to the backend
    const ratingData = {
      username,
      recipename,
      post_id,
      score,
      comment,
    };

    // Make a POST request to the backend
    try {
      const response = await fetch("/api/rating/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      const result = await response.json();

      // Handle the response from the server
      if (response.ok) {
        console.log("Rating submitted successfully:", result);
      } else {
        console.error("Failed to submit rating:", result.message);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleClick = async (value) => {
    try{
    await handleRating(post.username, post.name, post.id, value, "");
    const averageScore = await updateRatingDisplay(post.id);
    setCurrentValue(averageScore);
    } catch (error) {
      console.error('Error updating or fetching score:', error);
      return null;
    }
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
