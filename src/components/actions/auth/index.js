// Rules for actions:- 
// 1. Actions must return simple JS object.
// 2. Actions are pure function.

import { ADMIN_SIGNUP_URL, STUDENT_SIGNUP_URL, ADMIN_SIGNIN_URL, STUDENT_SIGNIN_URL } from "../../constants"

export const incrementHandler = (num) => {

    return { type: 'INC_COUNTER', data: num }

}

export const decrementHandler = (num) => {

    return { type: 'DEC_COUNTER', data: num }

}

export const authenticationHandler = (userObj, userSignupObj, isSignup, isAdmin) => {

    return async (dispatch, getState) => {

        console.log( "the params received", userObj, userSignupObj, isSignup, isAdmin, getState() )
    
        let response
        const url = isAdmin ? ADMIN_SIGNUP_URL : STUDENT_SIGNUP_URL
    
        if (isSignup) {
            const url = isAdmin ? ADMIN_SIGNUP_URL : STUDENT_SIGNUP_URL
            response = await fetch(url, {
    
                method: "POST",
                body: JSON.stringify(userSignupObj),
                headers: {
                    'Content-Type': 'application/json'
                }
    
            })
        } else {
            const url = isAdmin ? ADMIN_SIGNIN_URL : STUDENT_SIGNIN_URL
            response = await fetch(url, {
    
                method: "POST",
                body: JSON.stringify(userObj),
                headers: {
                    'Content-Type': 'application/json'
                }
    
            })
        }
    
    
        const parsedResponse = await response.json()
        // props.setUser(parsedResponse.user)
    
        dispatch({ type: 'USER_LOGIN', data: parsedResponse.user })
    }

}