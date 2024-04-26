import React from 'react'
import "../Navigation/Nav.css"
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

import {AiOutlineHome} from "react-icons/ai"
import {LiaUserFriendsSolid} from "react-icons/lia"
import {IoNotificationsOutline} from "react-icons/io5"

import Profile from "../../Assets/profile1.jpg"

const Nav = ({search,setSearch,setShowMenu,profileImg}) => {



  return (
    <nav>
        <div className="n-logo">
            <Link to="/" className='logo' style={{color:"black",textDecoration:"none"}}>
              <h1>Fork <span>folio</span></h1>
            </Link>
        </div>

      <div className="n-form-button" >

        <form className='n-form' onSubmit={(e)=>e.preventDefault()} >
          <CiSearch className='search-icon'/>
          <input type="text"
          placeholder='Search post'
          id='n-search'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="social-icons">
      <Link to="/" style={{textDecoration:"none",display:"flex",alignItems:"center",color:"white"}}>
        <AiOutlineHome className='nav-icons'/>
      </Link>

        {/* <Link to="/notification" id='notifi' style={{marginTop:"8px"}}><IoNotificationsOutline className='nav-icons'/><span>5</span></Link>

        <LiaUserFriendsSolid
        className='nav-icons'
        onClick={()=>setShowMenu(true)}/> */}
      </div>


       <div className="n-profile" >
          <Link to="/profile">
            <img src={profileImg ? (profileImg) : Profile} className='n-img' style={{marginBottom:"-7px"}}/>
          </Link>
      </div>

    </nav>
  )
}

export default Nav