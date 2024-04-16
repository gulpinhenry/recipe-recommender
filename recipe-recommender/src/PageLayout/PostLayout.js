import React from "react";
import { useState } from "react";
import "./PostLayout.css";
import Left from "../Components/Left/Left";
import Right from "../Components/Right/Right";
import Nav from "../Components/Navigation/Nav";
import PostComp from "../Components/PostComp/PostComp";

import img1 from "../Assets/Post Images/img1.jpg";
import img2 from "../Assets/Post Images/img2.jpg";
import img3 from "../Assets/Post Images/img3.jpg";

import DPimg1 from "../Assets/DP/img1.jpg";
import DPimg2 from "../Assets/DP/img2.jpg";
import DPimg3 from "../Assets/DP/img3.jpg";

import Cover1 from "../Assets/Friends-Cover/cover-1.jpg";
import Cover2 from "../Assets/Friends-Cover/cover-2.jpg";
import Cover3 from "../Assets/Friends-Cover/cover-3.jpg";

import moment from "moment/moment";

const Landingpage = ({type}) => {
  const posts = [
    {
      id: 1,
      username: "Harry",
      title: "Spaghetti",
      profilepicture: DPimg1,
      img: img1,
      datetime: moment("20230131", "YYYYMMDD").fromNow(),
      body: "My 1st Post, Have A Good Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex doloragnam ea?",
      like: 44,
      comment: 3,
      unFilledLike: true,
      coverpicture: Cover1,
      userid: "@Iamharry",
      ModelCountryName: "USA",
      ModelJobName: "Java Developer",
      ModelJoinedDate: "Joined in 2019-02-28",
      followers: 1478,
    },
    {
      id: 2,
      username: "chris dhaniel",
      profilepicture: DPimg2,
      img: img2,
      datetime: moment("20230605", "YYYYMMDD").fromNow(),
      body: "My 2st Post, Have A Bad Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex dolor reiciendis, consequuntur placeat repellat magnam ea?",
      like: 84,
      comment: 3,
      coverpicture: Cover2,
      userid: "@chris777",
      ModelCountryName: "Australia",
      ModelJobName: "Cyber Security",
      ModelJoinedDate: "Joined in 2018-01-17",
      followers: 1730,
    },
    // {
    //   id:3,
    //   username:"April",
    //   profilepicture:DPimg3,
    //   img:img3,
    //   datetime:moment("20230813", "YYYYMMDD").fromNow(),
    //   body:"My 3st Post, Have A Nice Day Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ipsum laborum necessitatibus ex dolor reiciendis, consequuntur",
    //   like: 340,
    //   comment:76,
    //   coverpicture:Cover3,
    //   userid:"@April",
    //   ModelCountryName:"India",
    //   ModelJobName:"Python Developer",
    //   ModelJoinedDate:"Joined in 2022-03-01",
    //   followers:426
    // }
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