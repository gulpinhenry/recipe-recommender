import Info from './Info'
// import UserHome from '../UserHome/UserHome'

import Profileimg from "../../Assets/Friends-Cover/cover-1.jpg"
import img1 from "../../Assets/info_dp/img-1.jpg"
import img2 from  "../../Assets/info_dp/img-2.jpg"
import img3 from  "../../Assets/info_dp/img-3.jpg"
import { useEffect, useState } from 'react'
import "../Profile/Profile.css"

import moment from 'moment'

const Profile = ({following,
                        search,
                        images,
                        setImages,
                        profileImg,
                        setProfileImg,
                        name,
                        setName,
                        userName,
                        setUserName,
                        modelDetails,
                        setModelDetails}) => {

  const [userPostData ,setUserPostData] =useState(
    [
      {
        id:1,
        username:"Vijay",
        profilepicture:Profile,
        img:img1,
        datetime:moment("20230401", "YYYYMMDD").fromNow(),
        body:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
        like: 22,
        comment:12
    }
    ]
  )

  return (
    <div className='profileMiddle'>
        <Info
        modelDetails ={modelDetails}
        setModelDetails={setModelDetails}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        userPostData={userPostData}
        following={following}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        />

        {/* <UserHome
        modelDetails={modelDetails}
        profileImg={profileImg}
        setUserPostData={setUserPostData}
        userPostData={searchResults}
        images={images}
        /> */}
    </div>
  )
}

export default Profile