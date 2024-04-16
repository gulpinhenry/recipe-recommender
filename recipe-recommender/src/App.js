import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './PageLayout/MainLayout';
import PostLayout from './PageLayout/PostLayout';
import LoginLayout from './PageLayout/LoginLayout';
import WrongPageLayout from './PageLayout/WrongPageLayout';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <div className='App'>
      <Routes>
         <Route path='/home' element={loggedIn ? <MainLayout /> : <LoginLayout />} />
        <Route path='/create' element={loggedIn ? <PostLayout type={"create"}/> : <LoginLayout/>} />
        <Route path='/profile' element={loggedIn ? <PostLayout type={"profile"}/> : <LoginLayout/>} />
        <Route path='/saved' element={loggedIn ? <PostLayout type={"saved"}/> : <LoginLayout/>} />
         <Route path='*' element={<WrongPageLayout />} />
      </Routes>
    <div>
    </div>
  );
}

export default App;
