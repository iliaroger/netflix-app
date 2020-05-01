import React from 'react';
import '../Components/Footer.css';
import {Dropdown} from 'react-bootstrap';
import {switchLanguageToEnglish, switchLanguageToGerman} from './actions/actions';
import {useDispatch, useSelector} from 'react-redux';

const Footer = (props) =>{

    const dispatch = useDispatch();
    const language = useSelector(state => state.language)

    return(
            <div className="col-md-12 footerWrapper">
                <div className="contentBox">
                    <h3>Questions? Contact us.</h3>
                    <div className="footerItems">
                        <p>Gift Card Terms</p>
                        <p>Terms of Use</p>
                        <p>Privacy Statement</p>
                    </div>
                    <Dropdown className="footerDropdown">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {language}
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