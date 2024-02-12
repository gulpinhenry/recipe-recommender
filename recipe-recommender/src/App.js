import React from 'react';
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Pages/MainLayout'

function App() {
  return (
<div>
  <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayout />} />
      </Routes>
    </div>
</div>
  );
}

export default App;