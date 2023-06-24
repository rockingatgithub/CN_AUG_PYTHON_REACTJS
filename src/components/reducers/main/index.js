const initialState = {
    user: null,
    token: '',
    isAdmin: false,
    isLogged: false,
    counter: 0
}

function mainReducer (state=initialState, action) {

    switch (action.type) {
        case 'INC_COUNTER':
            
            return { ...state, counter: state.counter + action.data }
        case 'DEC_COUNTER':
        
            return { ...state, counter: state.counter - action.data }
        
        case 'USER_LOGIN':
            return {...state, user: action.data.student, token: action.data.token}
    
        default:
            return state
    }

}

export default mainReducer