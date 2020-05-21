import React, {useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../Components/ContentMenu.css'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useSpring, animated} from 'react-spring';

export default function ContentMenu() {

    const user = useSelector(state => state.activeUser);
    const currentUser = useRef(user);
    const [profileIcon, setProfileIcon] = useState('');

    const scrollLeft = useSpring({
        
    })

    useEffect(()=>{
        switch (user){
            case 'tony':
                setProfileIcon('/img/ironMan.jpg');
                break;
            case 'stephen':
                setProfileIcon('/img/drStrange.jpg');
                break;
            case 'thor':
                setProfileIcon('/img/thor.jpg');
                break;
            case 'wanda':
                setProfileIcon('/img/wanda.jpg');
                break;
            default:
            return ''
        }
    },[])

    return (
        <div className="row contentMenuRow">
            <div className="col-md-12 navbarWrapper">
                <Navbar className="cmNavbar" expand="lg">
                <Navbar.Brand className="cmText" href="#home">
                    <img className="d-inline-block align-top" width="100px" src= '/img/netflixLogo.png' alt="netflix logo"></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link className="cmText" href="#home">Home</Nav.Link>
                    <Nav.Link className="cmText" href="#link">TV Shows</Nav.Link>
                    <Nav.Link className="cmText" href="#link">Movies</Nav.Link>
                    <Nav.Link className="cmText" href="#link">My List</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link>
                            {<h4>Hi, {user}</h4>}
                        </Nav.Link>
                        <Nav.Link className="navbarIconLink">
                            <img className="navbarProfileIcon profileFloat" src={profileIcon} alt={user}></img>
                        </Nav.Link>
                        <Nav.Link className="cmText" href="#logout">
                           Logout 
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Navbar>
            </div>
            
            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Movies</h1>
                </div>
                <div className="contentSection">
                    <div id="swipeLeft"></div>
                    <div id="swipeRight"></div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                </div>
            </div>
                

    </div>
    )
}
