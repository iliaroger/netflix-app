import React, {useRef} from 'react';
import {useSelector} from 'react-redux';


export default function ContentMenu() {

    const user = useSelector(state => state.activeUser)
    const currentUser = useRef(user);

    return (
        <div>
            <h1>Welcome to Netflix {currentUser.current}</h1>
        </div>
    )
}
