import logo from './logo.svg';
import './App.css';
// import { route } from '../backend/routes/vocher';
// impo
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Staff_login from './components/Login/Staff_login';
import Register from './components/Register/Register';
import Gmlogin from './components/Login/Gm_login';
import Acao_login from './components/Login/Acao_login';
import Vc_login from './components/Login/VC_login';
import Cashier_login from './components/Login/Cashier_login';


//      /Gm/ .......   ----> route for the gm page


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/Staff-login' element={<Staff_login />}></Route>
        <Route path='/Gm/staff-register' element={<Register />}></Route> 
        <Route path='/Gm-login' element={<Gmlogin />}></Route>
        <Route path='/acao-login' element={<Acao_login />}></Route>
        <Route path='/vc-login' element={<Vc_login />}></Route>
        <Route path='/cashier-login' element={<Cashier_login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
