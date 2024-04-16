import React, { useState } from 'react'
import "../Left/Left.css"
import {AiOutlineHome} from "react-icons/ai"
import { LuChefHat } from "react-icons/lu";
import { Link } from 'react-router-dom';
import {BsBookmark} from "react-icons/bs"
import { PiCookingPot } from "react-icons/pi";
import {FiSettings} from "react-icons/fi"


const Left = ({
              }) => {

  const [btnActive,setBtnActive] =useState("#")

  return (
    <div className="L-features">
      <Link to="/home" style={{textDecoration:"none",color:"black"}}>
        <div onClick={()=>setBtnActive("#")} id='L-box' className={btnActive === "#" ? "active" : ""} >
          <AiOutlineHome className='margin'/>
          <span style={{ marginLeft: '8px' }}>Browse</span>
        </div>
      </Link>


      <Link to="/create" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box' onClick={()=>setBtnActive("#explore")} className={btnActive === "#explore" ? "active" : ""}>
        <PiCookingPot
          className='margin'/>
         <span style={{ marginLeft: '8px' }}>Create</span>
      </div>

      </Link>
      <Link to="/profile" style={{textDecoration:"none",color:"black"}}>
      <div id='L-box'  onClick={()=>setBtnActive("#trending")} className={btnActive === "#trending" ? "active" : ""}>
          <LuChefHat
           className='margin'/>
        <span style={{ marginLeft: '8px' }}>Profile</span>
      </div>
      </Link>

      <Link to="/saved" style={{textDecoration:"none",color:"black"}}>

      <div id='L-box' onClick={()=>setBtnActive("#saved")} className={btnActive === "#saved" ? "active" : ""}>
        <BsBookmark
         className='margin'/>
        <span style={{ marginLeft: '8px' }}>Saved Post</span>
      </div>
      </Link>

      {/* <div id='L-box' onClick={()=>setBtnActive("#settings")} className={btnActive === "#settings" ? "active" : ""}>
        <FiSettings
        className='margin'/>
        <span style={{ marginLeft: '8px' }}>Settings</span>
      </div> */}

    </div>
  )
}

export default Left