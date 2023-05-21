import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

        <Form onSubmit={submitHandler}>

            {props.isSignup &&
                <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Roll</Form.Label>
                        <Form.Control type="password" placeholder="Roll" value={roll} onChange={(event) => setRoll(event.target.value)} />
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