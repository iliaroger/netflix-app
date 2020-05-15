import thunk from 'redux-thunk';
import reducer from './reducers/reducer.js';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['language', 'userAuthenticated', 'activeUser']
}

const persistedReducer = persistReducer(persistConfig, reducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

let store = createStore(persistedReducer)
let persistor = persistStore(store)

export {
    store, persistor
}

// const store = createStore(reducer, compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))


