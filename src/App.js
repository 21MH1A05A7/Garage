import logo from './logo.svg';
import './App.css';
// import { route } from '../backend/routes/vocher';
// impo
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Staff_login from './components/Login/Staff_login';
import Register from './components/Register/Register';
import Gmlogin from './components/Login/Gm_login';


//      /Gm/ .......   ----> route for the gm page


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/Staff-login' element={<Staff_login />}></Route>
        <Route path='/Gm/staff-register' element={<Register />}></Route> 
        <Route path='/Gmlogin' element={<Gmlogin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
