import React, { useEffect, useState } from "react";
import "./MainLayout.css";
import Left from "../Components/Left/Left";
import Right from "../Components/Right/Right";
import Nav from "../Components/Navigation/Nav";
import Middle from "../Components/Middle/Middle";
import moment from "moment";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/post/recent/100")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const formattedPosts = data.data.map((post) => ({
          picture: post.picture,
          id: post._id,
          username: post.user.username,
          profilepicture: "URL/to/profile/picture", // Adjust this as needed
          img: "URL/to/post/image", // Adjust this as needed
          datetime: moment(post.createdAt).fromNow(),
          recipeid: post.recipe._id,
          name: post.recipe.name,
          ingredients: post.recipe.ingredients.join(", "),
          categories: post.recipe.foodCategories.join(", "),
          calories: post.recipe.calories,
          // instructions: (post.recipe.instructions.split('.').filter(step => step.trim().length > 0)).map((step, index) => `${index + 1}. ${step.trim()}`).join('\n'),
          instructions: post.recipe.instructions,
          // Iterate through GlobalRatings and get the average of GlobatRatings.score, and then round to 2 decimals
          score: post.recipe.GlobalRatings
            ? (
                post.recipe.GlobalRatings.reduce(
                  (acc, rating) => acc + rating.score,
                  0
                ) / post.recipe.GlobalRatings.length
              ).toFixed(2)
            : 0,
          caption: post.caption,

          like: 0, // Default value, update if backend includes this info
          comment: 0, // Default value, update if backend includes this info
          unFilledLike: true, // Default or based on user interaction
          coverpicture: "URL/to/cover/picture", // Adjust this as needed
          userid: `@${post.user.username}`,
          ModelCountryName: "Country", // Placeholder or add to backend
          ModelJobName: "Job Title", // Placeholder or add to backend
          ModelJoinedDate: `Joined in ${moment(post.user.createdAt).format(
            "YYYY-MM-DD"
          )}`,
          followers: 0, // Default or actual data if included in backend

          ratings: post.PostRatings.map((rating) => ({
            id: rating._id,
            score: rating.score,
            user: rating.user.username,
            comment: rating.comment,
            datetime: moment(rating.createdAt).fromNow(),
          })),
        }));
        setPosts(formattedPosts);
      })
      .catch((error) =>
        console.error("There was an error fetching the posts:", error)
      );
  }, []);

  return (
    <div className="interface">
      <Nav />
      <div className="home">
        <Left />
        <Middle posts={posts} />
        {/* <Right /> */}
      </div>
    </div>
  );
};

export default LandingPage;
