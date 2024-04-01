import React from 'react'
import RecipeForm from '../Create/RecipeForm'
import MealSingle from '../SingleMeal/SingleMeal'
import SavedRecipes from '../SavedPost/SavedPost'
import "../Middle/Post.css"




const Post = ({post,posts,setPosts,setFriendsProfile,images}) => {

  return (
    <div className='post'>
      <RecipeForm/>
      {/* <SavedRecipes/> */}
      {/* <MealSingle/> */}
  </div>
  )
}

export default Post