import { useState } from "react"

const UserForm = (props) => {

    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = async (event) => {
        event.preventDefault()

        const userObj = {
            email,
            password,
            name,
            roll
        }
        console.log(userObj)

        const response = await fetch('http://localhost:8000/student', {

            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const parsedResponse = await response.json()
        
        console.log(parsedResponse)
    }

    return <>
        <h2>{props.heading}</h2>
        <form onSubmit={submitHandler} >
            Name:- <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            <br/>
            Roll:- <input type="text" value={roll} onChange={(event) => setRoll(event.target.value)}/>
            <br/>
            Email:- <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <br/>
            Passowrd:- <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
            <br/>
            <button type="submit" > Submit </button>
        </form>
    </>

}

export default UserForm