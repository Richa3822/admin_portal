import React from 'react'
import { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';


 const OrderNavbar = ()=> {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  return (
        <Navbar light expand="md" className='mt-5'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
                <NavLink>All Orders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" >Completed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" color='light'>Cancled</NavLink>
            </NavItem> 
          </Nav>
        </Collapse>
      </Navbar>


  )
}
export default OrderNavbar