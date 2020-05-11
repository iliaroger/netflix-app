
const authReducer = (state = false, action) =>{
    switch(action.payload){
        case true: 
            return state = true;
        case false: 
            return state = false;
        default: 
            return state = false;
    }
}

export default authReducer;