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

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - pageSize, 0));
  };

  const handleNext = () => {
    setIndex((prevIndex) => Math.min(prevIndex + pageSize, posts.length - pageSize));
  };

  return (
    <div className="my-posts-container">
      {posts.slice(index, index + pageSize).map((post, idx) => (
        <div key={idx} className="my-post">
          <div>
            <h3>{post.recipe ? post.recipe.name : 'No Recipe Name'}</h3>
            <p>{post.caption}</p>
          </div>
          <div className="ingredients">
            <strong>Ingredients: </strong>
            {post.recipe ? post.recipe.ingredients.join(', ') : 'No Ingredients'}
          </div>
        </div>
      ))}
      <button onClick={handlePrev} disabled={index === 0} className="my-posts-button prev">&#10094;</button>
      <button onClick={handleNext} disabled={index >= posts.length - pageSize} className="my-posts-button next">&#10095;</button>
    </div>
  );
};

const Dashboard = () => {
  const [tastePreferences, setTastePreferences] = useState([]);
  const [allergySettings, setAllergySettings] = useState([]);
  const [inputValueTaste, setInputValueTaste] = useState('');
  const [inputValueAllergy, setInputValueAllergy] = useState('');

  const navigate = useNavigate();

  // Function to fetch user settings
  const fetchSettings = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      console.log("No username found in local storage.");
      return; // Early return if no username is found
    }

    try {
      const response = await fetch(`/api/user/settings/${username}`);
      const data = await response.json();
      if (data.success) {
        setTastePreferences(data.data.tastePreferences.map(pref => ({ id: pref, text: pref })));
        setAllergySettings(data.data.allergy.map(allergy => ({ id: allergy, text: allergy })));
      } else {
        console.error('Failed to fetch settings:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const saveAndBacktrack = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      console.error("No username found in local storage.");
      return; // Early return if no username is found
    }

    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          allergy: allergySettings.map(item => item.text), // Assuming your data structure needs this mapping
          tastePreferences: tastePreferences.map(item => item.text) // Same assumption as above
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log('Settings updated successfully:', data.message);
        // Optionally, navigate back or to another route if needed
        // navigate('/profile');
      } else {
        console.error('Failed to update settings:', data.message);
      }
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
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

      <button onClick={fetchSettings} className="backtrack-button">Reset</button>
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
      
      <MyPosts username={localStorage.getItem('username')} />
      <Dashboard />
      
    </div>
  );
};

export default Profile;