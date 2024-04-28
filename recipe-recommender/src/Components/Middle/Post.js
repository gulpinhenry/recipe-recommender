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

import { LiaFacebookF } from "react-icons/lia";
import { FiInstagram } from "react-icons/fi";
import { BiLogoLinkedin } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { RxTwitterLogo } from "react-icons/rx";
import { FiGithub } from "react-icons/fi";

import img1 from "../../Assets/middle_static/img-1.jpg";
import img2 from "../../Assets/middle_static/img-3.jpg";
import img3 from "../../Assets/middle_static/img-4.jpg";

import Profile from "../../Assets/profile1.jpg";

import { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import moment from "moment";
import { Link } from "react-router-dom";
import tempImage from "../../Assets/Post_Images/img1.jpg";

const Post = ({ post, posts, setPosts, setFriendsProfile, images }) => {
  const [comments, setComments] = useState(false);

  const [like, setLike] = useState(post.like);
  const [unlike, setUnlike] = useState(false);

  const [filledLike, setFilledLike] = useState(<FavoriteBorderOutlinedIcon />);
  const [unFilledLike, setUnFilledLike] = useState(false);

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
  console.log(post);

  const handleDelete = async (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        console.log(id);
        const response = await fetch(`/api/post/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Assuming you may need to pass some kind of authorization token
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleCommentInput = async (e) => {
    e.preventDefault();

    // Assuming you have the score input in your form
    // const score = document.getElementById("scoreInput").value;

    // Retrieving the username from localStorage
    const username = localStorage.getItem("username");

    // Collecting the necessary data
    const data = {
      username: username,
      recipename: post.name,
      post_id: post.id,
      // score: parseInt(score, 5),
      comment: commentInput,
    };
    console.log(data);
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
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you use a Bearer token for authorization
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
            <img src={post.profilepicture} className="p-img" alt="" />
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
            <img src={tempImage} alt="" className="post-img" />
            <div className="img-overlay">
              <Link to={`/recipe/${post.id}`}>
                <p className="img-text">{post.name}</p>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            <StarRating currentRating={getAverageRating(post.ratings)} post={post}/>

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

          {/* <div className="like-comment-details">
            <span className="post-comment">
              {post.ratings == null ? 0 : post.ratings.length} rating(s)
            </span>
          </div> */}
        
          {showComment && post.ratings != null && (
            <div className="commentSection">
              <form onSubmit={handleCommentInput}>
                <div className="cmtGroup">
                  <SentimentSatisfiedRoundedIcon className="emoji" />

                  <input
                    type="text"
                    id="commentInput"
                    required
                    placeholder="Add a comment..."
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                  />
                  {/* add another input for the score */}
                  {/* <input
                    type="number"
                    id="scoreInput"
                    required
                    placeholder="Score (1-5)"
                  /> */}

                  <button type="submit">
                    <SendRoundedIcon className="send" />
                  </button>
                </div>
              </form>

              <div className="sticky">
                {post.ratings.map((comment) => (
                  <Comments key={comment.id} cmt={comment} />
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
