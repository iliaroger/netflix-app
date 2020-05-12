import {combineReducers} from 'redux';
import languageReducer from './switchLanguage';
import authReducer from './authReducer';
import selectedUser from './selectedUser'; 

export default combineReducers({
    language: languageReducer,
    userAuthenticated: authReducer,
    activeUser: selectedUser 
});
