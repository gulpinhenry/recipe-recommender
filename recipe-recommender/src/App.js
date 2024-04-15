import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <div className='App'>
      <Routes>
         <Route path='/home' element={<MainLayout />} />
        <Route path='/create' element={<PostLayout type={"create"}/>} />
        <Route path='/profile' element={<PostLayout type={"profile"}/>} />
        <Route path='/saved' element={<PostLayout type={"saved"}/>} />
      </Routes>
    </div>
  );
}

export default App;
