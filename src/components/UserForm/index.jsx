import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const UserForm = (props) => {

    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


    const submitHandler = async (event) => {
        event.preventDefault()

        const userSignupObj = {
            email,
            password,
            name,
            roll
        }

        const userObj = { email, password }
        let response

        if (props.isSignup) {
            response = await fetch('http://localhost:8000/student', {

                method: "POST",
                body: JSON.stringify(userSignupObj),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
        } else {
            response = await fetch('http://localhost:8000/jwt', {

                method: "POST",
                body: JSON.stringify(userObj),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
        }


        const parsedResponse = await response.json()
        props.setUser(parsedResponse.student)
        navigate('/dashboard')
    }

    const googleLoginHandler = async (credentialResponse) => {

        const loginResponse = await fetch('http://localhost:8000/google', {
            method: "POST",
            body: JSON.stringify({
                token: credentialResponse.credential
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedResponse = await loginResponse.json()
        console.log("the google response", parsedResponse)
        props.setUser(parsedResponse.student)
        navigate('/dashboard')

    }

    return <>
        <h2>{props.heading}</h2>
        <form onSubmit={submitHandler} >

            {props.isSignup &&
                <> Name:- <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    <br />
                    Roll:- <input type="text" value={roll} onChange={(event) => setRoll(event.target.value)} />
                    <br />
                </>}

            Email:- <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
            <br />
            Passowrd:- <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button type="submit" > Submit </button>
        </form>

        <GoogleLogin
            onSuccess={credentialResponse => {
                googleLoginHandler(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />

    </>

}

export default UserForm