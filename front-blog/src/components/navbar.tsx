import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBackspace, faGear, faNoteSticky, faSearch, faSignIn, faSignOut, faPerson} from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from '../hooks/useAuth';

export interface NavbarProps {
}

export interface NavbarState {
}

export default function SiteNavbar(props: NavbarProps) {
  const userAuth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    setIsLoggedIn(userAuth.isAuthenticated);
  },[userAuth])

  return (
      <Navbar className="sticky" sticky={"top"} collapseOnSelect expand="lg" bg="light" variant="light" >

        <Container className="">
      <LinkContainer to="/"><Navbar.Brand href="#home">
      <img className="log-img" src={`${process.env.PUBLIC_URL}/assets/img/log.png`} alt="logo" />

        </Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav " />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto flexbox"
          >
          {userAuth.isAuthenticated?
          <LinkContainer to="blog/add"><Nav.Link><FontAwesomeIcon icon={ faNoteSticky }/> Add Post</Nav.Link></LinkContainer>
          :
          <></>
}
              {userAuth.isAuthenticated?
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item><LinkContainer to={`showProfile/${userAuth.userId}`}><Nav.Link><FontAwesomeIcon icon={ faPerson }/> Show</Nav.Link></LinkContainer></NavDropdown.Item>
                <NavDropdown.Item ><LinkContainer to="edit"><Nav.Link><FontAwesomeIcon icon={ faGear }/> Edit</Nav.Link></LinkContainer></NavDropdown.Item>
            </NavDropdown> : <></>}
          </Nav>
          {isLoggedIn?(
          <Nav className="flexbox">
          <LinkContainer to="/" onClick={()=>{localStorage.removeItem("token");userAuth.setIsAuthenticated(false)}}>
              <Nav.Link>Logout({userAuth.username}) <FontAwesomeIcon icon={ faSignOut }/></Nav.Link>
          </LinkContainer>
          </Nav>
          ):(
          <Nav>
          <LinkContainer to="login"><Nav.Link>Log In<FontAwesomeIcon icon={ faSignIn }/></Nav.Link></LinkContainer>
          <LinkContainer to="register"><Nav.Link>Register <FontAwesomeIcon icon={ faSignOut }/></Nav.Link></LinkContainer>
          </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}
