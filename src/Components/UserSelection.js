import React, {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import '../Components/UserSelection.css';
import {selectedUser} from '../actions/actions';

export default function UserSelection() {

    const userAuth = useSelector(state => state.userAuthenticated);

    const persistenAuth = useRef(userAuth);

    const dispatch = useDispatch();

    return (
        <div>
            {persistenAuth ? 
            <div>
                <div className="row startRow">
                    <div className="col-md-12">
                        <div className="startBox">
                            <h1>Who's watching?</h1>
                            <div className="startProfilesWrapper">
                                <Link to="/main" onClick={()=>{dispatch(selectedUser('stephen'))}}>
                                    <div className="startProfile">
                                        <div className="selectionImageWrapper">
                                            <img src='/img/drStrange.jpg' alt="profile 1"></img>
                                        </div>
                                        <h4>Stephen</h4>
                                    </div>
                                </Link>
                                <Link to="/main" onClick={()=>{dispatch(selectedUser('tony'))}}>
                                    <div className="startProfile">
                                        <div className="selectionImageWrapper">
                                            <img src= '/img/ironMan.jpg' alt="profile 1"></img>
                                        </div>
                                        <h4>Tony</h4>
                                    </div>
                                </Link>
                                <Link to="/main" onClick={()=>{dispatch(selectedUser('thor'))}}>
                                    <div className="startProfile">
                                        <div className="selectionImageWrapper">
                                            <img src= '/img/thor.jpg' alt="profile 1"></img>
                                        </div>
                                        <h4>Thor</h4>
                                    </div>
                                </Link>
                                <Link to="/main" onClick={()=>{dispatch(selectedUser('wanda'))}}>                                
                                    <div className="startProfile">
                                        <div className="selectionImageWrapper">
                                            <img src= '/img/wanda.jpg' alt="profile 1"></img>
                                        </div>
                                        <h4>Wanda</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="startBoxButton">
                                <button>Manage profiles</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <Redirect to="/"></Redirect>}
        </div>
    )
}
