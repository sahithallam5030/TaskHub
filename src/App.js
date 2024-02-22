import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from './components/Home'
import UserDashboard from './components/UserDashboard'
import {Route,Routes} from 'react-router-dom'
// import Footer from "./components/Footer";

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/userdashboard' element={<UserDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
