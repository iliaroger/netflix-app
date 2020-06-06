

function selectedUser(state = '', action){

    switch(action.type){
        case 'stephen': 
            return state = 'Stephen';
        
        case 'tony': 
            return state = 'Tony';

        case 'thor': 
            return state = 'Thor';
        
        case 'wanda': 
            return state = 'Wanda';
        
        default:
            return state
    
    } 

}


export default selectedUser;