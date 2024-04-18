import React from 'react'
import Post from './Post'

const Feedposts = ({posts,setPosts,setFriendsProfile}) => {
  return (
    <div className='feedposts'>
        {posts.map((post)=>(
            <Post
            posts={posts}
            post ={post}
            setPosts={setPosts}
            key={post.id}
            setFriendsProfile={setFriendsProfile}
            />
        ))}
    </div>
  )
}

export default Feedposts