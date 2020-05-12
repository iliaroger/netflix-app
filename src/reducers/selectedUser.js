

function selectedUser(state = null, action){

    switch(action){
        case action === 'stephen': 
            return state = 'stephen'
        
        case action === 'tony': 
            return state = 'tony'

        case action === 'thor': 
            return state = 'thor'
        
        case action === 'wanda': 
            return state = 'wanda'
        
        default:
            return state
    
    } 

}


export default selectedUser;