import React, {useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import '../Components/ContentMenu.css'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useSpring, animated} from 'react-spring';

export default function ContentMenu() {

    const user = useSelector(state => state.activeUser);
    const currentUser = useRef(user);
    const [profileIcon, setProfileIcon] = useState('');

    function SelectUser(){
        switch (user) {
            case 'Tony':
                setProfileIcon('/img/ironMan.jpg');
                break;
            case 'Stephen':
                setProfileIcon('/img/drStrange.jpg');
                break;
            case 'Thor':
                setProfileIcon('/img/thor.jpg');
                break;
            case 'Wanda':
                setProfileIcon('/img/wanda.jpg');
                break;
            default:
                return ''
        }
    }

    useEffect(()=>{
        SelectUser();
    },[])

    return (
        <div className="row contentMenuRow">
            <div className="col-md-12 navbarWrapper">
                <Navbar className="cmNavbar" expand="lg">
                <Navbar.Brand className="cmText" href="#home">
                    <img className="d-inline-block align-top" width="100px" src= '/img/icons/netflixLogo.png' alt="netflix logo"></img>
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
                            {<p>Hi, {user}</p>}
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
                    {/* <div id="swipeLeft" onClick={()=>{setLeft(!swipeLeft)}}></div>
                    <div id="swipeRight" onClick={()=>{setRight(!swipeRight)}}></div> */}
                    <div className="col-md-2 col-sm-4 selectionWrapper">
                        <div className="overlayText">
                            <div className="addToMyList">
                                <img src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                            </div>
                            <div className="overlayPlayButton">
                                <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                <h4>Tyler Rake Extraction</h4>
                                <p>Action, Thriller</p>
                            </div>
                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>         
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Series</h1>
                </div>
                <div className="contentSection">
                    {/* <div id="swipeLeft" onClick={()=>{setLeft(!swipeLeft)}}></div>
                    <div id="swipeRight" onClick={()=>{setRight(!swipeRight)}}></div> */}
                    <div className="col-md-2 col-sm-4 selectionWrapper">
                        <div className="overlayText">
                            <div className="addToMyList">
                                <img src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                            </div>
                            <div className="overlayPlayButton">
                                <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                <h4>Tyler Rake Extraction</h4>
                                <p>Action, Thriller</p>
                            </div>
                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>   
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">My List</h1>
                </div>
                <div className="contentSection">
                    {/* <div id="swipeLeft" onClick={()=>{setLeft(!swipeLeft)}}></div>
                    <div id="swipeRight" onClick={()=>{setRight(!swipeRight)}}></div> */}
                    <div className="col-md-2 col-sm-4 selectionWrapper">
                        <div className="overlayText">
                            <div className="addToMyList">
                                <img src="/img/icons/minusIcon.png" alt="add to my list icon"></img>
                            </div>
                            <div className="overlayPlayButton">
                                <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                <h4>Tyler Rake Extraction</h4>
                                <p>Action, Thriller</p>
                            </div>
                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>   
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Sci-Fi and Fantasy</h1>
                </div>
                <div className="contentSection">
                    {/* <div id="swipeLeft" onClick={()=>{setLeft(!swipeLeft)}}></div>
                    <div id="swipeRight" onClick={()=>{setRight(!swipeRight)}}></div> */}
                    <div className="col-md-2 col-sm-4 selectionWrapper">
                        <div className="overlayText">
                            <div className="addToMyList">
                                <img src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                            </div>
                            <div className="overlayPlayButton">
                                <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                <h4>Tyler Rake Extraction</h4>
                                <p>Action, Thriller</p>
                            </div>
                        </div>
                        <div className="selectionBox">
                            <img src= '/img/movies/tylerRakeExtraction.jpg' alt="tylerRakeMovie"></img>
                        </div>
                    </div>   
                </div>
            </div>

            <footer>
                    <div className="col-md-12">
                        <div className="footerWrapperContent">
                            <div className="footerIcons">
                                <div className="iconsWrapper">
                                    <img src='/img/icons/facebookIcon.png' alt="instagram icon"></img>
                                    <img src='/img/icons/instaIcon.png' alt="instagram icon"></img>
                                    <img src='/img/icons/twitterIcon.png' alt="twitter icon"></img>
                                    <img src='/img/icons/youtubeIcon.png' alt="instagram icon"></img>
                                </div>
                            </div>
                            <div className="row footerUpper">
                                <div className="col-md-3 col-sm-6">
                                        <p>Audio und Untertitel</p>
                                        <p>Medien-Center</p>
                                        <p>Datenschutz</p>
                                        <p>Kontakt</p>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                        <p>Audiodiskreption</p>
                                        <p>Anlegerbeziehungen</p>
                                        <p>Rechtliche Hinweise</p>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                        <p>Hilfe-Center</p>
                                        <p>Karriere</p>
                                        <p>Cookie-Einstellungen</p>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                        <p>Geschenkkarten</p>
                                        <p>Nutzungsbedingungen</p>
                                        <p>Impressum</p>
                                </div>
                            </div>
                            <div className="footerLower">
                                <Button>Service-Code</Button>
                                <p>&copy; 1997-2020 Netflix, Inc. i-08932ibuf9bi29f09978882eeee</p>
                            </div>
                    </div>
                </div>
            </footer>
                

    </div>
    )
}
