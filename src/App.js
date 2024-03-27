import logo from './logo.svg';
// import './App.css';
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
import StaffVocherStatus from './components/Staff/StaffVocherStatus';
import StaffVocherCreate from './components/Staff/StaffVocherCreate';
import StaffHome from './components/Staff/StaffHome';
import StaffVochers from './components/Staff/StaffVochers';
import VoucherState from './Context/VoucherState';
import GMHome from './components/GM/GMHome';
import GmVouchers from './components/GM/GmVouchers';
import GmVouchersStatus from './components/GM/GmVouchersStatus';
import AcaoHome from './components/ACAO/AcaoHome';
import AcaoVouchers from './components/ACAO/AcaoVouchers';
import AcaoStatus from './components/ACAO/AcaoStatus';
import VcHome from './components/VC/VcHome';
import VcVouchers from './components/VC/VcVouchers';
import CashierHome from './components/Cashier/CashierHome';
import CashierVouchers from './components/Cashier/CashierVouchers';
import Slide from './components/Sidebar';
import EditVoucher from './components/Staff/EditVoucher';


//      /Gm/ .......   ----> route for the gm page


function App() {
  return (
    <VoucherState>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/Staff-login' element={<Staff_login />}></Route>
        <Route path='/Gm/staff-register' element={<Register />}></Route> 
        <Route path='/Gm-login' element={<Gmlogin />}></Route>
        <Route path='/acao-login' element={<Acao_login />}></Route>
        <Route path='/vc-login' element={<Vc_login />}></Route>
        <Route path='/cashier-login' element={<Cashier_login />}></Route>
        <Route path='/staff/voucher-status' element={<StaffVocherStatus />}></Route>
        <Route path='/staff/createvoucher' element={<StaffVocherCreate />}></Route>
        <Route path='/staff' element={<StaffHome />}></Route>
        <Route path='/staff/view-vouchers' element={<StaffVochers />}></Route>
        <Route path='/Gm/view-vouchers' element={<GmVouchers />}></Route>
        <Route path='/Gm' element={<GMHome/>}></Route>
        <Route path='/Gm/voucher-status' element={<GmVouchersStatus />}></Route>
        <Route path='/acao' element={<AcaoHome/>}></Route>
        <Route path='/acao/view-vouchers' element={<AcaoVouchers />}></Route>
        <Route path='/acao/voucher-status' element={<AcaoStatus/>}></Route>
        <Route path='/vc' element={<VcHome />}></Route>
        <Route path='/vc/view-vouchers' element={<VcVouchers />}></Route>
        <Route path='/cashier' element={<CashierHome />}></Route>
        <Route path='/cashier/view-vouchers' element={<CashierVouchers />}></Route>
        <Route path='/about' element={<Slide />}></Route>
        <Route path='/staff/edit-voucher' element={<EditVoucher />}></Route>
      </Routes>
    </BrowserRouter>
    </VoucherState>
  );
}

export default App;
