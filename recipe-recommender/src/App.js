import React from 'react';
import { Route, Routes } from 'react-router-dom'
import MainLayout from './PageLayout/MainLayout'
import PostLayout from './PageLayout/PostLayout'

function App() {
  return (
<div>
  <div className='App'>
      <Routes>
         <Route path='/' element={<MainLayout />} />
        {/* <Route path='/create' element={<PostLayout />} /> */} 
        {/* <Route path='/' element={<PostLayout />} /> */}
      </Routes>
    </div>
</div>
  );
}

export default App;