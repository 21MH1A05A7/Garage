import React from 'react';

import './Generate_voucher.css'; // Import your custom CSS file for additional styling
import StaffVochers from './Staff/StaffVochers';
// import { Slide } from 'react-toastify';
function Slide() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-md-3 col-xl-2 px-sm-2 px-0 bg-dark fixed-sidebar">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <a href="voucher-page" className="nav-link align-middle px-0">
                  <span className="ms-1 d-none d-sm-inline">View Voucher</span>
                </a>
              </li>
              <li>
                <a href="Generate-voucher" className="nav-link px-0 align-middle">
                  <span className="ms-1 d-none d-sm-inline">Voucher Generator</span>
                </a>
              </li>
              <li>
                <a href="voucher" className="nav-link px-0 align-middle">
                  <span className="ms-1 d-none d-sm-inline">Voucher Status</span>
                </a>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                <span className="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <StaffVochers />
        </div>
      </div>
    </div>
  );
}

export default Slide;