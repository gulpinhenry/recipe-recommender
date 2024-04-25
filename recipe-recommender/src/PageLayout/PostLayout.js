import React from "react";
import { useState } from "react";
import "./PostLayout.css";
import Left from "../Components/Left/Left";
import Right from "../Components/Right/Right";
import Nav from "../Components/Navigation/Nav";
import PostComp from "../Components/PostComp/PostComp";

import img1 from "../Assets/Post_Images/img1.jpg";
import img2 from "../Assets/Post_Images/img2.jpg";
import img3 from "../Assets/Post_Images/img3.jpg";

import DPimg1 from "../Assets/DP/img1.jpg";
import DPimg2 from "../Assets/DP/img2.jpg";
import DPimg3 from "../Assets/DP/img3.jpg";

import Cover1 from "../Assets/Friends-Cover/cover-1.jpg";
import Cover2 from "../Assets/Friends-Cover/cover-2.jpg";
import Cover3 from "../Assets/Friends-Cover/cover-3.jpg";

import moment from "moment/moment";

const Landingpage = ({type}) => {
  const posts = [
  ];

  return (
    <div className="interface">
      <Nav />
      <div className="home_layout">
        <Left />
        { <PostComp posts={posts} type={type}/>}

      </div>
    </div>
  );
};

export default Landingpage;