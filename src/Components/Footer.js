import React from 'react';
import '../Components/Footer.css';
import {Dropdown} from 'react-bootstrap';
import {switchLanguageToEnglish, switchLanguageToGerman} from './actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {englishText, germanText} from '../translations/signIn';

const Footer = (props) =>{

    const dispatch = useDispatch();
    const currentLanguage = useSelector(state => state.language)

    return(
            <div className="col-md-12 footerWrapper">
                <div className="contentBox">
                    <h3>{currentLanguage === 'English' ? englishText.footerHeader : germanText.footerHeader}</h3>
                    <div className="footerItems">
                        <p>{currentLanguage === 'English' ? englishText.footerGift : germanText.footerGift}</p>
                        <p>{currentLanguage === 'English' ? englishText.footerTerms : germanText.footerTerms}</p>
                        <p>{currentLanguage === 'English' ? englishText.footerPrivacy : germanText.footerPrivacy}</p>
                    </div>
                    <Dropdown className="footerDropdown">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {currentLanguage}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={()=>{dispatch(switchLanguageToEnglish())}}>English</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={()=>{dispatch(switchLanguageToGerman())}}>Deutsch</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
    )
} 


export default Footer;