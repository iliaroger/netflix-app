import {combineReducers} from 'redux';
import languageReducer from './switchLanguage';

export default combineReducers({
    language: languageReducer
});
