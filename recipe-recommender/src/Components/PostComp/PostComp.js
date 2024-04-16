import React, { useEffect, useState } from 'react'
import Homepage from './Homepage'
import "../PostComp/PostComp.css"


const PostComp = ({type
              }) => {

    const [searchResults,setSearchResults] =useState("")
  return (
    <div className='M-features'>
        <Homepage
        type={type}
        />
    </div>
  )
}

export default PostComp