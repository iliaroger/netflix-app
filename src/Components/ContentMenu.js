import React, {useRef, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import '../Components/ContentMenu.css'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useSpring, animated} from 'react-spring';
import {userAutheticated} from '../actions/actions';
import firestore from './firestore';

export default function ContentMenu() {

    const [profileIcon, setProfileIcon] = useState('');
    const user = useSelector(state => state.activeUser);
    const authenticated = useSelector(state => state.userAuthenticated);
    const [isAuth, setAuth] = useState(true);
    const currentUser = useRef(user);
    const dispatch = useDispatch();
    const [activeTab, setTab] = useState('home');
    const [mediaData, setMedia] = useState(['']);
    const [recentlyList, setRecently] = useState(['']);
    const [favoritesList, setFavorites] = useState(['']);
    const [myList, setMyList] = useState([{
        type: 'movie',
        name: 'The Fast and the Furious',
        category: 'Action, Adventure',
        image: 'https://firebasestorage.googleapis.com/v0/b/netflixapp-2c830.appspot.com/o/netflix_movies%2FtheFastAndTheFurious.webp?alt=media&token=6a357649-ae2e-478b-8df3-c4e60c1de404'
    },
    {
        type: 'movie',
        name: 'Stranger Things',
        category: 'Horror',
        image: 'https://firebasestorage.googleapis.com/v0/b/netflixapp-2c830.appspot.com/o/netflix_series%2FstrangerThingsSeries.jpg?alt=media&token=990a14c3-7ef8-4117-9f8f-a9768e621cdc'
    }]);

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

    async function GetData(){
        let data = [];
        await firestore.db.collection("mediaData").get().then((querySnapshot)=>{
            querySnapshot.forEach((queryElement)=>{
                data.push({
                    type: queryElement.data().media_type,
                    name: queryElement.data().media_name,
                    category: queryElement.data().media_category,
                    image: queryElement.data().media_image,
                    id: queryElement.id
                })
            })
        });
        setMedia(data);
        PopulateRecentlyWatched(data);
        PopulateFavorites(data);
    }

    function AddToMyList(el){
        
        let checkArray = myList.filter(elem =>{
            return elem.name !== el.name
        })

        setMyList([
        ...checkArray,
        el
        ])
    }

    function RemoveFromMyList(el){
        let newArray = myList.filter((arrayElem)=>{
            return arrayElem.name !== el.name
        })
        setMyList(newArray);
    }

    function PopulateRecentlyWatched(data){
        let newData = data.filter(el=>{
            return el.name.length < 10;
        })

        setRecently(newData);
    }

    function PopulateFavorites(data){
        let newData = data.filter(el => {
            return el.name.length > 10;
        })

        console.log(data);

        setFavorites(newData);
    }

    useEffect(()=>{
        setAuth(authenticated);
        SelectUser();
        GetData();
    },[])

    return (

        <>
            
            {!isAuth ? <Redirect to={{pathname: '/'}}></Redirect> :

            <div className="row contentMenuRow">
            <div className="col-md-12 navbarWrapper">
                <Navbar className="cmNavbar" expand="lg">
                <Navbar.Brand className="cmText" href="#home">
                    <img className="d-inline-block align-top" width="100px" src= '/img/icons/netflixLogo.png' alt="netflix logo"></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link onClick={()=>{setTab('home')}} className={activeTab === 'home' ? 'activeTab' : 'cmText'} href="#home">Home</Nav.Link>
                    <Nav.Link onClick={()=>{setTab('series')}} className={activeTab === 'series' ? 'activeTab' : 'cmText'} href="#series">TV Shows</Nav.Link>
                    <Nav.Link onClick={()=>{setTab('movies')}} className={activeTab === 'movies' ? 'activeTab' : 'cmText'} href="#movies">Movies</Nav.Link>
                    <Nav.Link onClick={()=>{setTab('myList')}} className={activeTab === 'myList' ? 'activeTab' : 'cmText'} href="#myList">My List</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link>
                            {<p className="cmText">Hi, {user}</p>}
                        </Nav.Link>
                        <Nav.Link className="navbarIconLink">
                            <img className="navbarProfileIcon profileFloat" src={profileIcon} alt={user}></img>
                        </Nav.Link>
                        <Nav.Link onClick={()=>{dispatch(userAutheticated(false)); setAuth(false)}} className="cmText" href="#logout">
                           Logout 
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Navbar>
            </div>

            {
                /*
                switching between nav tabs
                 */
            }
            {(()=>{
                switch(activeTab){
                    case 'home': 
                    return <>
                <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Movies</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 

                        mediaData.map((el)=>{

                            if(el.type === 'movie'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                            }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Series</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 

                        mediaData.map((el)=>{
                            if(el.type === 'series'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                            }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">My List</h1>
                </div>
                <div className="contentSection">
                    {
                        myList.map((el)=>{
                            return <>
                            <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{RemoveFromMyList(el)}} src="/img/icons/minusIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                </>
                        })
                    }
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Sci-Fi and Fantasy</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if(firstCategory[0] === 'Sci-fi' || trimSecond === 'Sci-fi'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Drama</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if(firstCategory[0] === 'Drama' || trimSecond === 'Drama'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Adventure</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if(firstCategory[0] === 'Adventure' || trimSecond === 'Adventure'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>


            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Thriller</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if(firstCategory[0] === 'Thriller' || trimSecond === 'Thriller'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
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
                    </>;



                    case 'series':
                        return <>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">All Series</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 

                        mediaData.map((el)=>{
                            if(el.type === 'series'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                            }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">My List</h1>
                </div>
                <div className="contentSection">
                    {
                        myList.map((el)=>{
                            return <>
                            <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{RemoveFromMyList(el)}} src="/img/icons/minusIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                </>
                        })
                    }
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Sci-Fi and Fantasy</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if( (firstCategory[0] === 'Sci-fi' && el.type === 'series') || (trimSecond === 'Sci-fi' && el.type === 'series')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Action</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if( (firstCategory[0] === 'Action' && el.type === 'series') || (trimSecond === 'Action' && el.type === 'series')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Horror</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if( (firstCategory[0] === 'Horror' && el.type === 'series') || (trimSecond === 'Horror' && el.type === 'series')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Drama</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if( (firstCategory[0] === 'Drama' && el.type === 'series') || (trimSecond === 'Drama' && el.type === 'series')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
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

                        </>;
                        
                        





                    case 'movies':
                        return <>

                        <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">All Movies</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 

                        mediaData.map((el)=>{

                            if(el.type === 'movie'){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                            }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">My List</h1>
                </div>
                <div className="contentSection">
                    {
                        myList.map((el)=>{
                            return <>
                            <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{RemoveFromMyList(el)}} src="/img/icons/minusIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                </>
                        })
                    }
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Action</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if((firstCategory[0] === 'Action' && el.type === 'movie') || (trimSecond === 'Action' && el.types === 'movie')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Sci-Fi and Fantasy</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if((firstCategory[0] === 'Sci-fi' && el.type === 'movie') || (trimSecond === 'Sci-fi' && el.type === 'movie')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Adventure</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if((firstCategory[0] === 'Adventure' && el.type === 'movie') || (trimSecond === 'Adventure' && el.type === 'movie')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Thriller</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if((firstCategory[0] === 'Thriller' && el.type === 'movie') || (trimSecond === 'Thriller' && el.type === 'movie')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Comedy</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if((firstCategory[0] === 'Comedy' && el.type === 'movie') || (trimSecond === 'Comedy' && el.type === 'movie')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
                </div>
            </div>

            <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">War and History</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        mediaData.map((el)=>{
                            let firstCategory = el.category !== undefined ? el.category.split(',') : '';
                            let trimSecond = firstCategory[1] !== undefined ? firstCategory[1].trim() : '';
                            if((firstCategory[0] === 'War' && el.type === 'movie') || (trimSecond === 'War' && el.type === 'movie')){
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                                }
                            return null;
                        })
                    }    
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

                        </>;


                    case 'myList':
                        return <>

                <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">My List</h1>
                </div>
                <div className="contentSection">
                    {
                        myList.map((el)=>{
                            return <>
                            <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{RemoveFromMyList(el)}} src="/img/icons/minusIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                </>
                        })
                    }
                    </div>
                </div>

                <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Recently Watched</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        recentlyList.map((el)=>{
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                        })
                    }    
                </div>
            </div>


                    <div className="col-md-12 moviesSection">
                <div className="movieTitleWrapper">
                    <h1 className="sectionHeader">Favorites</h1>
                </div>
                <div className="contentSection">
                    {mediaData === [] ? <h2>Failed to load the data</h2> : 
                        favoritesList.map((el)=>{
                            return <>
                                    <div className="col-md-2 col-sm-4 selectionWrapper">
                                            <div className="overlayText">
                                                <div className="addToMyList">
                                                    <img onClick={()=>{AddToMyList(el)}} src="/img/icons/addIcon.png" alt="add to my list icon"></img>
                                                </div>
                                                <div className="overlayPlayButton">
                                                    <img src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <img className="hiddenPlayButton" src="/img/icons/playButton.png" alt="play movie button"></img>
                                                    <h4>{el.name}</h4>
                                                    <p>{el.category}</p>
                                                </div>
                                            </div>
                                            <div className="selectionBox">
                                                <img src={el.image} alt={`${el.name} ${el.type}`}></img>
                                            </div>
                                        </div>     
                                    </>
                        })
                    }    
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

                        </>;





                    default:
                        return <div className="col-md-12"><h3>Navigation menu not found.</h3></div>;
                        
                }
            })()}       

            </div>
            }
        </>
    )
}
