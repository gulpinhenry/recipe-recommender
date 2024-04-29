import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './ProfileEdit.css'; // Ensure you have the Dashboard.css in the correct path
import deleteIcon from '../../Assets/tag_delete.png'

const TagInput = ({ title, tags, setTags, inputValue, setInputValue }) => {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTag = (setTags) => {
    if (inputValue.trim() !== '') {
      const newTag = { id: Date.now().toString(), text: inputValue.trim() };
      setTags(tags => [...tags, newTag]);
      setInputValue('');
    }
  };

  const handleDeleteTag = (tagId, setTags) => {
    setTags(tags => tags.filter(tag => tag.id !== tagId));
  };

  return (
    <div>
      <h2 className="tag-title">{title}</h2>
      <ul className="tag-list">
        {tags.map(tag => (
          <li key={tag.id} className="tag-item">
            {tag.text}
            <button onClick={() => handleDeleteTag(tag.id, setTags)} className="tag-remove-button">
                <img src={deleteIcon} alt="Delete" />
            </button>
          </li>
        ))}
      </ul>
      <input
        className="tag-input-field"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(event) => event.key === 'Enter' ? handleAddTag(setTags) : null}
        placeholder="Add new tag"
      />
    </div>
  );
};
export default TagInput;
