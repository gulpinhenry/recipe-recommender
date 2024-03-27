import React, { useEffect, useState } from 'react'
import Homepage from './Homepage'
import "../PostComp/PostComp.css"


const PostComp = ({
              }) => {

    const [searchResults,setSearchResults] =useState("")

  return (
    <div className='M-features'>
        <Homepage
        />
    </div>
  )
}

export default PostComp