import React from 'react'
import "../Pages/MainLayout.css"
import Left from '../Components/Left/Left'
import Nav from '../Components/Navigation/Nav'


const Landingpage = ({}) => {
  return (
    <div className='interface'>
      <Nav />
    <div className="home">
      <Left />
      </div>
      </div>
  )
}

export default Landingpage