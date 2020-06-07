import React, {useState} from 'react';
import './Login.css';
import Footer from './Footer';
import {Link, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {englishText, germanText} from '../translations/signIn';
import firestore from '../Components/firestore';
import {userAutheticated} from '../actions/actions';

export default function Login() {

    const [showCaptchaText, setCaptcha] = useState(false);
    const [signInError, setError] = useState(false);
    const [userSignedIn, setUserSignedIn] = useState(false);

    const currentLanguage = useSelector(state => state.language);

    const dispatch = useDispatch();

    let emailInput = '';
    let passwordInput = '';

    // call setError if authentication fails (inside the catch function) 
    // create a redux store
    // create local variable for changeLanguage. useEffect to check whenever changeLanguage is changed 

    function triggerCaptchaText(){
        setCaptcha(!showCaptchaText);
    }

    function verifyUser(){

        const authPromise = firestore.auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);

        authPromise.then((res)=>{
            dispatch(userAutheticated(true));
            setUserSignedIn(true);
        }).catch((err)=>{
            setError(true);
        })
        
    }

    return (
        <div>
            {userSignedIn ? <Redirect to={{
                pathname: '/user',
                state: {validated: true}
                }} /> : null}
            <div className="row justify-content-center loginRow">
                <img className="netflixLogo" alt="netflix logo" src= '/img/icons/netflixLogo.png'></img>
                <div className="col-3 signInBox">
                    <div className="signInContent">
                        <h2 className="signInHeader">{currentLanguage === 'English' ? englishText.signIn : germanText.signIn}</h2>
                        <form>
                            <div className="form-group inputBox">
                                <input ref={input => emailInput = input} value="admin@netflix.com" type="email" aria-describedby="emailHelp" placeholder={currentLanguage === 'English' ? englishText.placeholderEmail : germanText.placeholderEmail}></input>
                            </div>
                            <div className="form-group inputBox">
                                <input ref={input => passwordInput = input} value="admin1234" type="password" placeholder={currentLanguage === 'English' ? englishText.placeholderPassword : germanText.placeholderPassword}></input>
                            </div>
                            <button onClick={(e)=>{e.preventDefault(); verifyUser()}} type="submit" className="btn loginButton">{currentLanguage === 'English' ? englishText.signInButton : germanText.signInButton}</button>
                            {signInError ? <p className="errorEmailPassword">{currentLanguage === 'English' ? englishText.incorrectInput : germanText.incorrectInput}</p> : null}
                            <div className="form-check helpBox">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                <label className="form-check-label" htmlFor="exampleCheck1">{currentLanguage === 'English' ? englishText.rememberMe : germanText.rememberMe}</label>
                                <label className="form-check-label" htmlFor="exampleCheck1">{currentLanguage === 'English' ? englishText.needHelp : germanText.needHelp}</label>
                            </div>
                        </form>
                        <div className="loginFacebook">
                            <img src= '/img/icons/facebookLogo.png' alt="facebook logo"></img>
                            <p>{currentLanguage === 'English' ? englishText.loginWithFacebook : germanText.loginWithFacebook}</p>
                        </div>
                        <div className="signUpLink">
                            <p>{currentLanguage === 'English' ? englishText.newToNetflix : germanText.newToNetflix}</p>
                            <Link to="/signup">{currentLanguage === 'English' ? englishText.signUpNow : germanText.signUpNow}</Link>
                        </div>
                        <div className="recaptchaBox">
                            <p>{currentLanguage === 'English' ? englishText.securedByCaptcha : germanText.securedByCaptcha}</p>
                            <p onClick={triggerCaptchaText} id="learnMoreText">{currentLanguage === 'English' ? englishText.learnMore : germanText.learnMore}</p>
                            { showCaptchaText ? <p>{currentLanguage === 'English' ? englishText.privacyStatement : germanText.privacyStatement}</p> : null}
                        </div>
                    </div>
                </div>
                {console.log('rerender occured')}
            <Footer></Footer>
            </div>
        </div>
    )
}
