import Info from './Info'
import Profileimg from "../../Assets/Friends-Cover/cover-1.jpg"
import img1 from "../../Assets/info_dp/img-1.jpg"
import img2 from  "../../Assets/info_dp/img-2.jpg"
import img3 from  "../../Assets/info_dp/img-3.jpg"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import "../Profile/Profile.css"

import TagInput from "./ProfileEdit"
import "./MyPost.css"
import moment from 'moment';

const MyPosts = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    async function fetchPosts() {
      if (!username) return;
      try {
        const response = await fetch(`/api/post/user/${username}`);
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          console.error('Failed to fetch posts:', data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, [username]);

  const calculateAverageScore = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
    return totalScore / ratings.length;
  };

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - pageSize, 0));
  };

  const handleNext = () => {
    setIndex((prevIndex) => Math.min(prevIndex + pageSize, posts.length - pageSize));
  };

  return (
    <div className="my-posts-container">
      <div className="my-posts">
        {posts.slice(index, index + pageSize).map((post, idx) => {
          const averageScore = calculateAverageScore(post.recipe.GlobalRatings);
          return (
            <div key={idx} className="my-post">
              <h3>{post.recipe ? post.recipe.name : 'No Recipe Name'}</h3>
              <p>{post.caption}</p>
              <div className="additional-info">
                <p>Ingredients: {post.recipe ? post.recipe.ingredients.join(', ') : 'No Ingredients'}</p>
                <p>Score: {averageScore}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={handlePrev} disabled={index === 0} className="my-posts-button prev">&#10094;</button>
      <button onClick={handleNext} disabled={index >= posts.length - pageSize} className="my-posts-button next">&#10095;</button>
    </div>
  );
};

const Dashboard = () => {
  const [tastePreferences, setTastePreferences] = useState([{ id: 'sweet', text: 'Sweet' }]);
  const [allergySettings, setAllergySettings] = useState([{ id: 'nuts', text: 'Nuts' }]);
  const [inputValueTaste, setInputValueTaste] = useState('');
  const [inputValueAllergy, setInputValueAllergy] = useState('');

  const navigate = useNavigate();

  const saveAndBacktrack = () => {
    console.log('Saving settings:', { tastePreferences, allergySettings });
    navigate('/profile');
  };

  return (
    <div>
      <TagInput
        title="Taste Preferences"
        tags={tastePreferences}
        setTags={setTastePreferences}
        inputValue={inputValueTaste}
        setInputValue={setInputValueTaste}
      />

      <TagInput
        title="Allergy Settings"
        tags={allergySettings}
        setTags={setAllergySettings}
        inputValue={inputValueAllergy}
        setInputValue={setInputValueAllergy}
      />

      <button onClick={() => navigate('/profile')} className="backtrack-button">Reset</button>
      <button onClick={saveAndBacktrack} className="save-button">Save</button>
    </div>
  );
};

const Profile = ({ following, name, userName }) => {
  const [userPostData, setUserPostData] = useState([
    {
      id: 1,
      username: "Vijay",
      profilepicture: Profileimg,
      img: img1,
      datetime: moment("20230401", "YYYYMMDD").fromNow(),
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illum provident consequuntur reprehenderit tenetur, molestiae quae blanditiis rem placeat! Eligendi, qui quia quibusdam dolore molestiae veniam neque fuga explicabo illum?",
      like: 22,
      comment: 12
    }
  ]);

  return (
    <div className='profileMiddle'>
      <Info
        userPostData={userPostData}
        following={following}
        name={name}
        userName={userName}
      />
    <MyPosts username="lehan" />
      <Dashboard />
      
    </div>
  );
};

export default Profile;