import { GoogleLogin } from "@react-oauth/google"
import { useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookie from 'js-cookie'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ADMIN_SIGNIN_URL, ADMIN_SIGNUP_URL, STUDENT_SIGNIN_URL, STUDENT_SIGNUP_URL } from "../constants";
import { connect, useDispatch } from "react-redux";
import { authenticationHandler, decrementHandler, googleAuthHandler, incrementHandler } from "../actions/auth";

const UserForm = (props) => {

    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

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
        dispatch(authenticationHandler(userObj, userSignupObj, props.isSignup, isAdmin))
        navigate('/dashboard')
    }

    const googleLoginHandler = async (credentialResponse) => {

        dispatch(googleAuthHandler(credentialResponse.credential))
        Cookie.set('user', props.main.token)
        navigate('/dashboard')

    }

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


        <div>

            <button onClick={() => dispatch(incrementHandler(10))} > Increment </button>
            <span>{props.main.counter}</span>
            <button onClick={() => dispatch(decrementHandler(10))} > Decrement </button>

        </div>

    </>

}

const mapStateToProps = state => {
    return { main: state }
}

export default connect(mapStateToProps)(UserForm)

