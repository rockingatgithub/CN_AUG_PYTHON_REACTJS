const initialState = {
    user: null,
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
    
        default:
            return state
    }

}

export default mainReducer