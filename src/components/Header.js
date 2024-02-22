import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useSelector,useDispatch} from 'react-redux'
import { clearLogin } from '../slices/userSlice';
import {useNavigate} from 'react-router-dom'

function Header() {
  let {isSuccess,userObj}=useSelector(state=>state.users);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userLogout=()=>{
    dispatch(clearLogin());
    navigate('/')
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='navbar-links'>TashHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              (isSuccess!==true) ?
            <>
            <Nav.Link href="/" className='navbar-links'>Home</Nav.Link>
            <Nav.Link href="/signup" className='navbar-links'>Signup</Nav.Link>
            <Nav.Link href="/login" className='navbar-links'>Login</Nav.Link>
            <Nav.Link href="/contact" className='navbar-links'>Contact us</Nav.Link>
            </>
            :
            <>
            <NavDropdown title={userObj.username} id="basic-nav-dropdown" className='navbar-links'>
              <NavDropdown.Item href="">Change Password</NavDropdown.Item>
              <NavDropdown.Item onClick={userLogout}>
                Logout
              </NavDropdown.Item>
              
            </NavDropdown>
            </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
