import Cookies from "js-cookie"
import { useState } from "react"

const Dashboard = (props) => {

    const [name, setName] = useState('')

    const submitHandler = async (event) => {

        event.preventDefault()

        const response = await fetch("http://localhost:8000/api/v1/student", {
            method: "PUT",
            body: JSON.stringify({ name}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('user')
            }
        })

        const parsedResponse = await response.json()
        if(response.status === 200) {
            console.log(response.status, " ",  parsedResponse)
            props.setUser(parsedResponse.student)
        }

    }

    return (
        <div>
            <h2> Profile </h2>
            <div>
                Name:-  {props.user.name}
            </div>
            <div>
                Email:-  {props.user.email}
            </div>

            <form onSubmit={submitHandler} >

                <input value={name} onChange={(event) => setName(event.target.value)} />
                <button type="submit" > Submit </button>

            </form>

        </div>
    )

}

export default Dashboard