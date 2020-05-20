import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import '../Components/ContentMenu.css'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';


export default function ContentMenu() {

    const user = useSelector(state => state.activeUser)
    const currentUser = useRef(user);

    return (
        <div className="row contentMenuRow">
            <div className="col-md-12 navbarWrapper">
                <Navbar className="cmNavbar" expand="lg">
                <Navbar.Brand className="cmText" href="#home">
                    <img className="d-inline-block align-top" width="100px" src={require('../img/netflixLogo.png')} alt="netflix logo"></img>
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
                            <img className="navbarProfileIcon profileFloat" src={require('../img/drStrange.jpg')} alt="profile"></img>
                        </Nav.Link>
                        <Nav.Link className="cmText" href="#logout">
                           Logout 
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Navbar>
            </div>


                <div className="contentSection">
                    <h1 className="sectionHeader">Movies</h1>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src={require("../img/movies/tylerRakeExtraction.jpg")} alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src={require("../img/movies/tylerRakeExtraction.jpg")} alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src={require("../img/movies/tylerRakeExtraction.jpg")} alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src={require("../img/movies/tylerRakeExtraction.jpg")} alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src={require("../img/movies/tylerRakeExtraction.jpg")} alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src={require("../img/movies/tylerRakeExtraction.jpg")} alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                    <div className="col-md-2 selectionWrapper">
                        <div className="overlayText">

                        </div>
                        <div className="selectionBox">
                            <img src={require("../img/movies/tylerRakeExtraction.jpg")} alt="tylerRakeMovie"></img>
                        </div>
                    </div>
                </div>
    </div>
    )
}
