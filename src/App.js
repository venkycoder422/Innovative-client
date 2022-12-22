import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar  from './components/Navbar';
import { Home } from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Blogs } from './pages/Blogs';
import { CreateBlog } from './pages/CreateBlog';
import { SinglePost } from './pages/SinglePost';
function App() {
  return (
    
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/blogs" element={<Blogs />}></Route>
      <Route exact path="/create" element={<CreateBlog />}></Route>
      <Route exact path="/blog/:id" element={<SinglePost />}></Route>
    
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
