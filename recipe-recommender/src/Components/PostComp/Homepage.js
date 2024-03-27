import React from 'react'
import Feedposts from './Feedposts'
import "../Middle/Homepage.css"


const Homepage = ({posts,setPosts,setFriendsProfile,images}) => {
  return (
    <main className='homepage'>

        <Feedposts
                        images={images}
                        posts={posts}
                        setPosts={setPosts}
                        setFriendsProfile={setFriendsProfile}
                        />
    </main>
  )
}

export default Homepage