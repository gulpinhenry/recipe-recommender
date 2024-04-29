import React from "react";
import "../Middle/Post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import StarRating from "./StarRating";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { PiSmileySad } from "react-icons/pi";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdReportGmailerrorred } from "react-icons/md";

import Profile from "../../Assets/profile1.jpg";

import { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import moment from "moment";
import { Link } from "react-router-dom";
import tempImage from "../../Assets/Post_Images/img1.jpg";

const Post = ({ post, posts, setPosts, setFriendsProfile, images }) => {
  const [comments, setComments] = useState(false);
  const [postComments, setPostComments] = useState(post.ratings);

  const [like, setLike] = useState(post.like);
  const [unlike, setUnlike] = useState(false);

  const [filledLike, setFilledLike] = useState(<FavoriteBorderOutlinedIcon />);
  const [unFilledLike, setUnFilledLike] = useState(false);

  const defaultPic = (img) => {
    if (img == "") {
      return "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
    }
    return img;
  };

  const handlelikes = () => {
    setLike(unlike ? like - 1 : like + 1);
    setUnlike(!unlike);

    setFilledLike(
      unFilledLike ? <FavoriteBorderOutlinedIcon /> : <FavoriteRoundedIcon />
    );
    setUnFilledLike(!unFilledLike);
  };

  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const getAverageRating = (ratings) => {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce(
      (accumulator, current) => accumulator + current.score,
      0
    );
    return sum / ratings.length;
  };

  const handleDelete = async (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        console.log(id);
        const response = await fetch(`/api/post/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // // Assuming you may need to pass some kind of authorization token
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setShowDelete(false);

        // Optionally, display a message
        alert("Post deleted successfully.");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete the post.");
      }
    }
  };
  const [commentInput, setCommentInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  const handleCommentInput = async (e) => {
    e.preventDefault();

    // Assuming you have the score input in your form
    // const score = document.getElementById("scoreInput").value;

    // Collecting the necessary data
    const data = {
      username: localStorage.getItem("username"),
      recipename: post.name,
      post_id: post.id,
      // score: parseInt(score, 5),
      comment: commentInput,
    };
    // Posting the data to the API endpoint
    try {
      if (data.comment === "") {
        alert("Please enter a comment");
        return;
      }
      if (data.score < 1 || data.score > 5) {
        alert("Please enter a score between 1 and 5");
        return;
      }

      const response = await fetch("api/rating/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Additional logic to handle after successful posting
      // e.g., clear form, update UI, etc.
      setCommentInput("");
      // Optionally reload comments or handle state update
      window.alert("Comment posted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchRatingsByPostId = async (postId) => {
    const url = `/api/rating/post/${postId}`; // Construct the URL with the post ID

    try {
      const response = await fetch(url, {
        method: "GET", // HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type header
        },
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        console.log("Ratings fetched successfully:", data.data);
        return data.data; // Return the ratings data
      } else {
        throw new Error(data.error || "Failed to fetch ratings");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
      return null; // Return null or handle the error as needed
    }
  };

  const handleRating = async (
    username,
    recipename,
    post_id,
    score,
    comment
  ) => {
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
      console.log(result);
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

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await handleRating(
        localStorage.getItem("username"),
        post.name,
        post.id,
        ratingInput,
        commentInput
      );
      const newComments = await fetchRatingsByPostId(post.id);
      setPostComments(newComments);
      setCommentInput(""); // Clear the comment input
      setRatingInput("");
    } catch (error) {
      console.error("Error in creating comment:", error);
      return null;
    }
  };


  const handleFriendsId = (id) => {
    const friendsIdFilter = posts.filter((val) => val.id === id);
    setFriendsProfile(friendsIdFilter);
  };

  const [socialIcons, setSocialIcons] = useState(false);

  const addToMyRecipeList = async (recipeId) => {
    const username = localStorage.getItem("username");
    const data = {
      username: username,
      recipe_id: recipeId,
    };

    try {
      console.log(data);
      const response = await fetch("/api/recipe/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("Recipe added to your list successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add recipe to your list.");
    }
  };
  console.log(post);
  return (
    <div className="post">
      <Link to="/FriendsId" style={{ textDecoration: "none" }}>
        <h1 className="title">{post.title}</h1>
      </Link>
      <div className="post-header">
        <Link to="/FriendsId" style={{ textDecoration: "none" }}>
          <div
            className="post-user"
            onClick={() => handleFriendsId(post.id)}
            style={{ cursor: "pointer" }}
          >
            {/* <img src={post.profilepicture} className="p-img" alt="" /> */}
            <h2>{post.username}</h2>
            <p className="datePara">{post.datetime}</p>
          </div>
        </Link>
        <div className="delete">
          {/* check if post's username is equal to localstorage username */}

          {showDelete && post.username === localStorage.getItem("username") && (
            <div className="options">
              {/* <button><PiSmileySad />Not Interested in this post</button>
            <button><IoVolumeMuteOutline />Mute this user</button>
            <button><MdBlockFlipped />Block this user</button> */}
              <button onClick={() => handleDelete(post.id)}>
                <AiOutlineDelete />
                Delete
              </button>
              {/* <button><MdReportGmailerrorred />Report post</button> */}
            </div>
          )}
          <MoreVertRoundedIcon
            className="post-vertical-icon"
            onClick={() => setShowDelete(!showDelete)}
          />
        </div>
      </div>
      <p className="body">
        <br></br>
        {post.caption}
        
      </p>
      <div className="post-img-container">
        {tempImage && (
          <>
            <img src={defaultPic(post.picture)} alt="" className="post-img" />
            <div className="img-overlay">
              <Link to={`/recipe/${post.id}`}>
                <p className="img-text">{post.name}</p>
              </Link>
            </div>
          </>
        )}
      </div>
      
      {/* Add just the post name a link to the full recipe, no image */}
      
      <Link to={`/recipe/${post.id}`} className="post-link">
        <p className="post-link-text">view recipe</p>
      </Link>
      {/* Add just the post name a link to the full recipe, no image */}

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            <StarRating
              currentRating={getAverageRating(postComments)}
              post={post}
            />

            <MessageRoundedIcon
              onClick={() => setShowComment(!showComment)}
              className="msg"
            />
            {localStorage.getItem("username") !== post.username && (
              <BookmarkIcon
                onClick={() => addToMyRecipeList(post.recipeid)}
                className="msg"
              />
            )}
          </div>
          {showComment && post.ratings != null && (
            <div className="commentSection">
              <form onSubmit={handleSubmitComment}>
                <div className="cmtGroup">
                  <SentimentSatisfiedRoundedIcon className="emoji" />

                  <input
                    type="text"
                    id="commentInput"
                    required
                    placeholder="Add a comment..."
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                    style={{
                      flexGrow: 1,
                      marginRight: "8px",
                      flexBasis: "auto",
                    }}
                  />
                  {/* add another input for the score */}
                  <input
                    type="number"
                    id="scoreInput"
                    required
                    placeholder="Score (1-5)"
                    onChange={(e) => setRatingInput(e.target.value)}
                    value={ratingInput}
                    style={{ width: "200px", flexGrow: 0 }}
                  />

                  <button type="submit">
                    <SendRoundedIcon className="send" />
                  </button>
                </div>
              </form>

              <div className="sticky">
                {postComments.map((comment) => (
                  <Comments cmt={comment} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
