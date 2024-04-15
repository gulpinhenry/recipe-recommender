import React from 'react'
import RecipeForm from '../Create/RecipeForm'
import MealSingle from '../SingleMeal/SingleMeal'
import SavedRecipes from '../SavedPost/SavedPost'
import Profile from '../Profile/Profile'
import "../Middle/Post.css"


const determine_type = (type) => {
  switch(type){
    case "create":
      return <RecipeForm/>
    case "saved":
      return <SavedRecipes/>
    case "single":
      return <MealSingle/>
    case "profile":
      return <Profile/>
  }
}

const Post = ({post,posts,setPosts,setFriendsProfile,images,type}) => {

  return (
    <div className='post'>
      {determine_type(type)}
  </div>
  )
}

export default Post