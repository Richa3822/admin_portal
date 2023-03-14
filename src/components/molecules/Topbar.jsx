import React, { useState } from 'react';
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

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};

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
        </Collapse>

      </Navbar>
    </div>
  );
}

export default Topbar;