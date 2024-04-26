import React, { useState } from "react";
import "./Info.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import Info3 from "../../Assets/info_dp/img-2.jpg";
import profileImg from "../../Assets/profile1.jpg";

import { LiaEdit } from "react-icons/lia";

import { IoCameraOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useRef } from "react";
import ModelProfile from "./ModelProfile";
import { Link } from "react-router-dom";

const Info = ({
  userPostData,
  following,
  setProfileImg,
  name,
  setName,
  userName,
  setUserName,
}) => {
  const logUserOut = () => {
    localStorage.setItem("loggedIn", false);
    window.location.href = "/";
    // alert("You are now logged out.");
  };

  const modelDetails = {
    ModelName: "John Snow",
    ModelCountryName: "Japan",
    ModelUserName: "ABCDEFG",
    ModelJobName: "Cook",
  };

  return (
    <div className="info">
      <div className="info-cover">
        <img src={Info3} alt="" />
        <img src={profileImg} alt="" />
        <div className="coverDiv">
          <IoCameraOutline className="coverSvg" />
        </div>
        <div className="profileDiv">
          <IoCameraOutline className="profileSvg" />
        </div>
      </div>

      <input type="file" style={{ display: "none" }} />

      <input type="file" style={{ display: "none" }} />

      <div className="info-follow">
        <h1>{modelDetails.ModelName}</h1>
        <p>{modelDetails.ModelUserName}</p>

        {/* <Link to="/home" className='logout'>
              <BiLogOut />Logout
            </Link> */}
        <button className="logout" onClick={logUserOut}>
          <BiLogOut /> Logout
        </button>

        <button>
          <LiaEdit />
          Edit Profile
        </button>
        <ModelProfile name={name} setName={setName} userName={userName} />

        <div className="info-details">
          <div className="info-col-1">
            <div className="info-details-list">
              <LocationOnOutlinedIcon />
              <span>{modelDetails.ModelCountryName}</span>
            </div>

            <div className="info-details-list">
              <WorkOutlineRoundedIcon />
              <span>{modelDetails.ModelJobName}</span>
            </div>

            <div className="info-details-list">
              <CalendarMonthRoundedIcon />
              <span>Joined in 2023-08-12</span>
            </div>
          </div>
          {/*
            <div className="info-col-2">
              <div>
                <h2>5,000</h2>
                <span>Followers</span>
              </div>
              <div>
                <h2>{userPostData.length}</h2>
                <span>Posts</span>
              </div>
              <div>
                <h2>{following}</h2>
                <span>Following</span>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Info;
