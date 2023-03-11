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

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar  className='navbar-dark bg-dark' light expand="md" style={{borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
        <NavbarBrand href="/" >Better Buy</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="" >Admin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" color='light'>Seller</NavLink>
            </NavItem>
          </Nav>
          <NavbarText color='light'>Profile</NavbarText>
        </Collapse>
       
      </Navbar>
    </div>
  );
}

export default Topbar;