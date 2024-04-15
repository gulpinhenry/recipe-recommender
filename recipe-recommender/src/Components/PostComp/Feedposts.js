import React from 'react'
import Post from './Post'

const Feedposts = ({posts,setPosts,setFriendsProfile,images,type}) => {
  return (
    <div className='feedposts'>
            <Post
            type={type}
            />
    </div>
  )
}

export default Feedposts