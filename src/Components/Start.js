import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../Components/Start.css';

export default function Start() {

    const userAuth = useSelector(state => state.userAuthenticated);

    const persistenAuth = useRef(userAuth);

    return (
        <div>
            {persistenAuth ? 
            <div>
                <div className="row startRow">
                    <div className="col-md-12">
                        <div className="startBox">
                            <h1>Who's watching?</h1>
                            <div className="startProfilesWrapper">
                                <div className="startProfile">
                                    <img src={require('../img/drStrange.jpg')} alt="profile 1"></img>
                                    <h4>Stephen</h4>
                                </div>
                                <div className="startProfile">
                                    <img src={require('../img/ironMan.jpg')} alt="profile 1"></img>
                                    <h4>Tony</h4>
                                </div>
                                <div className="startProfile">
                                    <img src={require('../img/thor.jpg')} alt="profile 1"></img>
                                    <h4>Thor</h4>
                                </div>
                                <div className="startProfile">
                                    <img src={require('../img/wanda.jpg')} alt="profile 1"></img>
                                    <h4>Wanda</h4>
                                </div>
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
