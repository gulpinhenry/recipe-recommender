import React, { useState } from 'react'
import { staticData } from '../../../Constants/staticData.js'
import "../Following/Following.css"
import FollowingList from './FollowingList.js'



const Following = ({}) => {

  const [showMore,setShowMore] =useState(false)


  return (
    <div className="following-comp">
      <h2>Popular Categories
      </h2>
      {staticData.popularCategories.map((data,id)=>(

        <FollowingList
        data={data}
        key={id}
        />
      ))}

        {/* <FollowingMore
        showMore={showMore}
        setShowMore={setShowMore}
        /> */}

      <button className='SM-btn' onClick={()=>setShowMore(true)}>Show more</button>
    </div>

  )
}

export default Following