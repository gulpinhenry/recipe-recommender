import React from 'react'
import Feedposts from './Feedposts'
import "../Middle/Homepage.css"


const Homepage = ({posts,setPosts,setFriendsProfile,images,type}) => {
  return (
    <main className='homepage'>

        <Feedposts
                        images={images}
                        posts={posts}
                        setPosts={setPosts}
                        setFriendsProfile={setFriendsProfile}
                        type={type}
                        />
    </main>
  )
}

export default Homepage