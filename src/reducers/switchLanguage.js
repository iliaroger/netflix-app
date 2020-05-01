
const languageReducer = (state = 'English', action) => {
    switch(action.type) {
        case 'SWITCH_ENGLISH': 
            return state = 'English';
        case 'SWITCH_GERMAN': 
            return state = 'Deutsch';
        default: 
            return state
    }
}


export default languageReducer;