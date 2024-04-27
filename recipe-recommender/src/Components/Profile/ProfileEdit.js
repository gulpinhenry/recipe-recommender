import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './ProfileEdit.css'; // Ensure you have the Dashboard.css in the correct path
import deleteIcon from '../../Assets/tag_delete.png'

const TagInput = ({ tags, setTags, inputValue, setInputValue }) => {
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
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(event) => event.key === 'Enter' ? handleAddTag(setTags) : null}
        placeholder="Add new tag"
      />
    </div>
  );
};

function Dashboard() {
  const [tastePreferences, setTastePreferences] = useState([{ id: 'sweet', text: 'Sweet' }]);
  const [allergySettings, setAllergySettings] = useState([{ id: 'nuts', text: 'Nuts' }]);
  const [inputValueTaste, setInputValueTaste] = useState('');
  const [inputValueAllergy, setInputValueAllergy] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const saveAndBacktrack = () => {
    // Save logic here (API call or localStorage)
    console.log('Saving settings:', { tastePreferences, allergySettings });
    // After saving, navigate back to the profile page
    navigate('/profile');
  };

  return (
    <div>
      <h2>Taste Preferences</h2>
      <TagInput
        tags={tastePreferences}
        setTags={setTastePreferences}
        inputValue={inputValueTaste}
        setInputValue={setInputValueTaste}
      />

      <h2>Allergy Settings</h2>
      <TagInput
        tags={allergySettings}
        setTags={setAllergySettings}
        inputValue={inputValueAllergy}
        setInputValue={setInputValueAllergy}
      />

      <button onClick={() => navigate('/profile')} className="backtrack-button">Reset</button>
      <button onClick={saveAndBacktrack} className="save-button">Save</button>
    </div>
  );
}

export default TagInput;
