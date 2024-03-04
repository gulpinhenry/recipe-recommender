import React, { useEffect, useState } from 'react'
import Homepage from "./Homepage"
import "../Middle/Middle.css"


const Middle = ({handleSubmit,
                body,
                setBody,
                setImportFile,
                posts,
                setPosts,
                search,
                images,
                setImages,
                handleImageChange,
                emptImg,
                setEmptImg,
                setFriendsProfile
              }) => {

    const [searchResults,setSearchResults] =useState("")

  return (
    <div className='M-features'>
        <Homepage
        posts ={posts}
        setPosts={setPosts}
        setFriendsProfile={setFriendsProfile}
        images={images}
        />
    </div>
  )
}

export default Middle