import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default function Start() {

    const userAuth = useSelector(state => state.userAuthenticated);

    return (
        <div>
            {userAuth ? 
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Hello</h1>
                    </div>
                </div>
            </div>
            : <Redirect to="/"></Redirect>}
        </div>
    )
}
