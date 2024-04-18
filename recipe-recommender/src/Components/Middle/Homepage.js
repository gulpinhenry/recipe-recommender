import React from 'react'
import Feedposts from './Feedposts'
import "../Middle/Homepage.css"


const Homepage = ({posts,setPosts,setFriendsProfile}) => {
  return (
    <main className='homepage'>

        {posts.length ? <Feedposts
                        posts={posts}
                        setPosts={setPosts}
                        setFriendsProfile={setFriendsProfile}
                        />
        :
        (<p style={{textAlign:"center",marginTop:"40px"}}>
            NO POSTS ARE HERE
        </p>)
        }
    </main>
  )
}

export default Homepage