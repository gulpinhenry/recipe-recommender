import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const textRef = useRef(null); // Reference to the text container
  const [expand, setExpand] = useState(false); // State to manage whether the card is expanded

  // Effect to check for overflow and expand if needed
  useEffect(() => {
    const textElement = textRef.current;
    if (textElement.scrollHeight > textElement.clientHeight) {
      setExpand(true); // Expand the card if content overflows
    }
  }, []); // Empty dependency array to run only once after initial render

  const cardStyle = {
    backgroundColor: 'white',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    margin: '0.5rem',
    width: '300px', // Fixed width
    height: expand ? 'auto' : '320px', // Adjusted height to be flexible or fixed
  };

  const contentStyle = {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden', // Hide overflow initially
    flex: 1 // Allow this container to expand and fill available space
  };

  const footerStyle = {
    padding: '1.25rem',
    backgroundColor: '#f9fafb',
    marginTop: 'auto', // Push the footer to the bottom
    display: 'flex',
    justifyContent: 'space-between', // Space items between: link on one side, calories on the other
    alignItems: 'center'
  };

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
          {post.recipe ? post.recipe.name : 'No Recipe Name'}
        </h3>
        {post.recipe && post.recipe.ingredients && (
          <p style={{ marginBottom: '1rem' }}>
            Ingredients: {post.recipe.ingredients.join(', ')}
          </p>
        )}
        <div ref={textRef} style={{ flex: '1', overflow: 'hidden' }}>{post.caption}</div>
      </div>
      <div style={footerStyle}>
        <Link to={`/recipe/${post.id}`} style={{ color: '#319795', textDecoration: 'none' }}>
          View Details
        </Link>
        <span>{post.recipe.calories ? `${post.recipe.calories} cal` : 'Calories N/A'}</span>  
      </div>
    </div>
  );
};

export default PostCard;
