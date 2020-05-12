

function selectedUser(state = '', action){

    switch(action.type){
        case 'stephen': 
            return state = 'stephen';
        
        case 'tony': 
            return state = 'tony';

        case 'thor': 
            return state = 'thor';
        
        case 'wanda': 
            return state = 'wanda';
        
        default:
            return state
    
    } 

}


export default selectedUser;