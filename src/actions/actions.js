
export function switchLanguageToEnglish(){
    return {
        type: 'SWITCH_ENGLISH'
    }
}

export function switchLanguageToGerman() {
    return {
        type: 'SWITCH_GERMAN'
    }
}

export function userAutheticated(bool){
    return {
        type: 'USER_AUTHENTICATED',
        payload: bool
    }
}