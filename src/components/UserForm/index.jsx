import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ADMIN_SIGNIN_URL, ADMIN_SIGNUP_URL, STUDENT_SIGNIN_URL, STUDENT_SIGNUP_URL } from "../constants";

const UserForm = (props) => {

    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)
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
        const url = isAdmin ? ADMIN_SIGNUP_URL : STUDENT_SIGNUP_URL

        if (props.isSignup) {
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
        props.setUser(parsedResponse.user)
        navigate('/dashboard')
    }

    const googleLoginHandler = async (credentialResponse) => {

        const loginResponse = await fetch('http://localhost:8000/api/v1/auth/google', {
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
        Cookie.set('user', parsedResponse.token)
        navigate('/dashboard')

    }

    // console.log(isAdmin)

    return <>
        <h2>{props.heading}</h2>

        <Form onSubmit={submitHandler}>

            {props.isSignup &&
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Roll</Form.Label>
                        <Form.Control type="number" placeholder="Roll" value={roll} onChange={(event) => setRoll(event.target.value)} />
                    </Form.Group></>
            }

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Admin</Form.Label>
            <Form.Check 
                type="checkbox" 
                id="admin" 
                value={isAdmin} 
                onChange={() => setAdmin((state) => !state)}
                placeholder="Admin Login"
                 />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            <GoogleLogin
            onSuccess={credentialResponse => {
                googleLoginHandler(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
        </Form>

    </>

}

export default UserForm