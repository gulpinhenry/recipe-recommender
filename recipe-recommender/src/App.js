import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './PageLayout/MainLayout'
import PostLayout from './PageLayout/PostLayout'
import WrongPageLayout from './PageLayout/WrongPageLayout'

function App() {
  return (
<div>
  <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayout />} />
        <Route path='/create' element={<PostLayout />} /> 
        {/* <Route path='/' element={<PostLayout />} /> */}
        <Route path='*' element={<WrongPageLayout />} />
      </Routes>
  </div>
</div>
  );
}

export default App;