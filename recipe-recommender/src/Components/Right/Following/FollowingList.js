import React, { useState } from 'react'

const FollowingUList = ({data,following,setFollowing}) => {

  return (
    <div className="following-people">
          <div className="following-details">
            <img src={data.img} alt="" />
              <div className="following-name-username">
                <h3>{data.name}</h3>
                {/* <p>{data.username}</p> */}
              </div>
          </div>

          {/* <button
          style={{background: clicked ? "transparent" : "linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)",
                  color:clicked ? "black" : "white",
                  border:clicked ? "2px solid orangered" : "none"
                }}
          onClick={handleFollow}
           >
          {followFollowed}
          </button> */}
    </div>
  )
}

export default FollowingUList