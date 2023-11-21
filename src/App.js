import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/home';
import CommentPage from './Components/commentsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route extra path='/home' element={<Home/>}/>
        <Route path='/post/comment/:userId/:postId' element={<CommentPage/>}/>
        <Route path='*' element={<Navigate to="/home"/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
