import {combineReducers} from 'redux';
import languageReducer from './switchLanguage';
import authReducer from './authReducer'

export default combineReducers({
    language: languageReducer,
    userAuthenticated: authReducer
});
