import React from 'react'
import Following from "./Following/Following"
import PopularList from "./Following/PopularList"
import "../Right/Right.css"

const Right = ({}) => {
    const showMenu = true
  return (
    <div className={showMenu ? "R-Side active" : "R-Side unActive"}>
      {/* <Following/> */}
      {/* <PopularList/> */}
    </div>
  )
}

export default Right