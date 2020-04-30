import React, {useState} from 'react';
import './Login.css';
import Footer from './Footer';
import {Link} from 'react-router-dom';

export default function Login() {

    const [showCaptchaText, setCaptcha] = useState(false);
    const [signInError, setError] = useState(false);

    // call setError if authentication fails (inside the catch function) 
    // create a redux store
    // create local variable for changeLanguage. useEffect to check whenever changeLanguage is changed 

    function TriggerCaptchaText(){
        setCaptcha(!showCaptchaText);
    }

    return (
        <div>
            <div className="row justify-content-center loginRow">
                <img className="netflixLogo" alt="netflix logo" src={require('../img/netflixLogo.png')}></img>
                <div className="col-3 signInBox">
                    <div className="signInContent">
                        <h2 className="signInHeader">Sign In</h2>
                        <form>
                            <div class="form-group inputBox">
                                <input type="email" aria-describedby="emailHelp" placeholder="Email or phone number"></input>
                            </div>
                            <div class="form-group inputBox">
                                <input type="password" placeholder="Password"></input>
                            </div>
                            <button type="submit" class="btn loginButton">Sign In</button>
                            {signInError ? <p className="errorEmailPassword">Your email or password is incorrect </p> : null}
                            <div class="form-check helpBox">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                                <label class="form-check-label" for="exampleCheck1">Remember me</label>
                                <label class="form-check-label" for="exampleCheck1">Need help?</label>
                            </div>
                        </form>
                        <div className="loginFacebook">
                            <img src={require("../img/facebookLogo.png")} alt="facebook logo"></img>
                            <p>Login with Facebook</p>
                        </div>
                        <div className="signUpLink">
                            <p>New to Netflix?</p>
                            <Link to="/signup"></Link>
                        </div>
                        <div className="recaptchaBox">
                            <p> This page is protected by Google reCAPTCHA to ensure you 're not a bot.</p>
                            <p onClick={TriggerCaptchaText} id="learnMoreText"> Learn more.</p>
                            { showCaptchaText ? <p>The information collected by Google reCAPTCHA is subject
                                to the Google Privacy Policy and Terms of Service, and is used for providing, 
                                maintaining, and improving the reCAPTCHA service and for general security purposes 
                                (it is not used for personalized advertising by Google).</p> : null}
                        </div>
                    </div>
                </div>
            <Footer></Footer>
            </div>
        </div>
    )
}
