import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Landingpage from './Pages/Landingpage'

function App() {
  return (
<div>
  <div className='App'>
      <Routes>
        <Route path='/' element={<Landingpage />} />
      </Routes>
    </div>
</div>
  );
}

export default App;