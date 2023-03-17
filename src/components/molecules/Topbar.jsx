import React, { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Logout from '../../services/Logout';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import ImgTag from '../atoms/ImgTag';
import Login from '../organisms/Login';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};

function set(){
  setRedirectToLogin(true)
}

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }


  return (
    <div>
      <Navbar className='navbar-dark bg-dark' light expand="md" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <NavbarBrand href="/" >
          <ImgTag imgUrl='/assets/images/logo1.png' width="70" alt='logo' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <NavbarText color='light'>{user.firstName}</NavbarText>
          <div style={{marginLeft:'1rem'}}>
          <NavbarText color='light' onClick={()=>{Logout();set()}}>Log out</NavbarText>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Topbar;